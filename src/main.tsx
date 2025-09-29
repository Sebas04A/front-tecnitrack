// index.tsx
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { ThemeProvider } from './context/ThemContext'
import { tecniTrackTheme } from './themes/tecniTrack'
// import { defaultTheme } from './themes/default'
// import { empresaXTheme } from './themes/empresaX'
// import { empresaYTheme } from './themes/empresaY'
import { AuthProvider } from './context/AuthProvider'
import { setupApi } from './api/setupApi'
import { ModalProvider } from './context/ModalContext'

setupApi()

// Detectar tenant (por subdominio, token, etc.)
// const host = window.location.hostname.split('.')[0]
// const tenant = ['empresaX', 'empresaY'].includes(host) ? host : 'Default' // Default tenant

const theme = tecniTrackTheme // Cambia esto según el tenant detectado

// Cambia esto según el tenant detectado
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <ModalProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </ModalProvider>
                {/* <ModalManager /> */}
            </ThemeProvider>
        </AuthProvider>
    </StrictMode>
)
