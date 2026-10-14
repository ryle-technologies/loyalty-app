import { Redis } from "@upstash/redis";

/**
 * Cliente de Upstash Redis (REST). Acepta las variables que inyecta la
 * integración de Upstash en Vercel Marketplace (`UPSTASH_REDIS_REST_*`) y las
 * del viejo Vercel KV (`KV_REST_API_*`).
 */
export function redisEnv(): { url: string; token: string } | null {
  const url =
    process.env.UPSTASH_REDIS_REST_URL?.trim() ||
    process.env.KV_REST_API_URL?.trim();
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN?.trim() ||
    process.env.KV_REST_API_TOKEN?.trim();
  return url && token ? { url, token } : null;
}

let client: Redis | null = null;

export function getRedis(): Redis | null {
  if (client) return client;
  const env = redisEnv();
  if (!env) return null;
  client = new Redis({ url: env.url, token: env.token });
  return client;
}
