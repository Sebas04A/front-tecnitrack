// src/api/setup.ts
import { OpenAPI } from './core/OpenAPI'

/**
 * Llama setupApi() en main.tsx antes de usar cualquier servicio.
 * - Usa tu propia URL desde env
 * - Adjunta automáticamente Authorization: Bearer <token>
 */
export function setupApi() {
    // 1) Tu propia URL (en dev y prod)
    OpenAPI.BASE = import.meta.env.VITE_API_URL

    // 2) Token Bearer (puede ser string o función async)
    //    Aquí lo leemos de localStorage, pero usa tu storage preferido.
    OpenAPI.TOKEN = localStorage.getItem('auth_token') || undefined

    // Opcional: cookies/same-site
    // OpenAPI.WITH_CREDENTIALS = true;

    console.log('API setup complete:', {
        base: OpenAPI.BASE,
        token: OpenAPI.TOKEN,
    })
}
