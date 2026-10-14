import { getRedis } from "@/lib/redis";

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSec: number;
}

export interface RateLimiter {
  check(key: string): Promise<RateLimitResult>;
}

interface Options {
  /** Envíos permitidos por ventana. */
  limit: number;
  /** Largo de la ventana en segundos. */
  windowSec: number;
}

/**
 * Ventana fija por instancia. En serverless cada instancia tiene su propio
 * contador, así que es un freno básico, no una garantía. Con Redis configurado
 * se usa `RedisRateLimiter`, que sí es global.
 */
class MemoryRateLimiter implements RateLimiter {
  private readonly hits = new Map<string, { count: number; resetAt: number }>();

  constructor(private readonly opts: Options) {}

  async check(key: string): Promise<RateLimitResult> {
    const now = Date.now();
    if (this.hits.size > 5000) {
      for (const [k, v] of this.hits) if (v.resetAt <= now) this.hits.delete(k);
    }
    const entry = this.hits.get(key);
    if (!entry || entry.resetAt <= now) {
      this.hits.set(key, { count: 1, resetAt: now + this.opts.windowSec * 1000 });
      return { allowed: true, remaining: this.opts.limit - 1, retryAfterSec: 0 };
    }
    entry.count += 1;
    const retryAfterSec = Math.ceil((entry.resetAt - now) / 1000);
    if (entry.count > this.opts.limit) {
      return { allowed: false, remaining: 0, retryAfterSec };
    }
    return { allowed: true, remaining: this.opts.limit - entry.count, retryAfterSec: 0 };
  }
}

class RedisRateLimiter implements RateLimiter {
  constructor(
    private readonly redis: NonNullable<ReturnType<typeof getRedis>>,
    private readonly opts: Options,
  ) {}

  async check(key: string): Promise<RateLimitResult> {
    const k = `ratelimit:registro:${key}`;
    const count = await this.redis.incr(k);
    if (count === 1) await this.redis.expire(k, this.opts.windowSec);
    if (count > this.opts.limit) {
      const ttl = await this.redis.ttl(k);
      return {
        allowed: false,
        remaining: 0,
        retryAfterSec: ttl > 0 ? ttl : this.opts.windowSec,
      };
    }
    return { allowed: true, remaining: this.opts.limit - count, retryAfterSec: 0 };
  }
}

const DEFAULTS: Options = {
  limit: Number(process.env.RATE_LIMIT_MAX ?? 5),
  windowSec: Number(process.env.RATE_LIMIT_WINDOW_SEC ?? 600),
};

const globalForLimiter = globalThis as unknown as { __rateLimiter?: RateLimiter };

export function getRateLimiter(): RateLimiter {
  if (!globalForLimiter.__rateLimiter) {
    const redis = getRedis();
    globalForLimiter.__rateLimiter = redis
      ? new RedisRateLimiter(redis, DEFAULTS)
      : new MemoryRateLimiter(DEFAULTS);
  }
  return globalForLimiter.__rateLimiter;
}

/** IP del cliente detrás del proxy de Vercel (o `unknown`). */
export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}
