// src/api/http.ts
import axios from 'axios'

const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { 'Content-Type': 'application/json' },
    // withCredentials: true, // si usas cookies
})

// Antes de cada petición, insertar token si existe
http.interceptors.request.use(config => {
    const token = localStorage.getItem('auth_token')
    if (token) config.headers!['Authorization'] = `Bearer ${token}`
    return config
})

// Manejo global de respuestas (por ejemplo, logout si 401)
http.interceptors.response.use(
    res => res,
    err => {
        if (err.response?.status === 401) {
            // aquí podrías llamar a tu método de logout
            window.dispatchEvent(new Event('force-logout'))
        }
        return Promise.reject(err)
    }
)

export default http
