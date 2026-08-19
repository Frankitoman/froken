# FRØKEN

Marca de moda femenina minimalista y selectiva con base en Copenhague. Landing con catálogo, carrito de compras, sistema de stock visible y asistente de soporte con IA.

- **Sitio**: [froken.francojmansilla.workers.dev](https://froken.francojmansilla.workers.dev/) — Cloudflare Worker (static assets)
- **Backend del chat**: [`gemini-proxy/`](gemini-proxy/) — Cloudflare Worker, ver su README para desplegar

El stock de cada producto es simulado por ahora (`in-stock` / `low-stock` / `sold-out` en `js/cart.js`), pensado para conectarse más adelante a un sistema real de inventario digital y físico.
