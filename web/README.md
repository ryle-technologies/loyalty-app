# Landing de comercios (pre-lanzamiento)

Next.js 16 (App Router, TypeScript) + Tailwind 4 + shadcn/ui. Copy v6 palabra por palabra, formulario de registro de interés, almacenamiento de leads detrás de `LeadStore` y exportación CSV protegida por token.

```bash
pnpm install
cp .env.example .env.local   # opcional
pnpm dev                     # http://localhost:3000
```

Toda la documentación (cómo se guardan los registros, variables de entorno, deploy en Vercel, cambios de copy respecto de v6 y pendientes para publicar) está en la sección **«Landing (`web/`)»** del [README de la raíz](../README.md#landing-web).

- Placeholders de publicación: `src/config/site.ts`
- Copy: `src/content/landing.ts`
- API: `src/app/api/registro/route.ts`, `src/app/api/admin/leads.csv/route.ts`
- Almacenamiento: `src/lib/leads/`
