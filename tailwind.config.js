import plugin from 'tailwindcss/plugin'

const bgAutoColors = {
    primary: 'on-primary',
    'primary-light': 'on-primary-light',
    'primary-dark': 'on-primary-dark',
    secondary: 'on-secondary',
    'secondary-light': 'on-secondary-light',
    'secondary-dark': 'on-secondary-dark',
    accent: 'on-accent',
    background: 'on-background',
    'background-accent': 'on-background-accent',
    success: 'on-success',
    error: 'on-error',
    warning: 'on-warning',
    info: 'on-info',
    unavailable: 'on-unavailable',
}

export default {
    content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
    theme: {
        extend: {
            fontSize: {
                xs: '0.7rem', // El default es 0.75rem
                sm: '0.8rem', // El default es 0.875rem
                base: '0.9rem', // El default es 1rem (16px) -> ¡Este cambio afecta a mucho!
                lg: '1rem', // El default es 1.125rem
                xl: '1.125rem', // El default es 1.25rem
                '2xl': '1.35rem', // El default es 1.5rem
                // ...y así sucesivamente puedes ajustar los que uses.
                // No tienes que definirlos todos, solo los que quieres cambiar.
            },

            // --- MODIFICANDO EL ESPACIADO ---
            // Esta es la más potente. Hacemos que la escala de espaciado sea más fina.
            spacing: {
                4: '0.8rem', // Default: 1rem (16px). Ahora p-4, m-4, w-4 serán más pequeños.
                8: '1.6rem', // Default: 2rem (32px).
                12: '2.4rem', // Default: 3rem (48px).
                16: '3.2rem', // Default: 4rem (64px).
                // Puedes ajustar todos los valores que necesites.
                // Por ejemplo, si usas mucho p-6 (1.5rem), puedes reducirlo:
                6: '1.2rem',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['Fira Code', 'monospace'],
            },
            colors: {
                primary: 'var(--color-primary)',
                'primary-light': 'var(--color-primary-light)',
                'primary-dark': 'var(--color-primary-dark)',

                secondary: 'var(--color-secondary)',
                'secondary-light': 'var(--color-secondary-light)',
                'secondary-dark': 'var(--color-secondary-dark)',

                accent: 'var(--color-accent)',

                background: 'var(--color-background)',
                'background-accent': 'var(--color-background-accent)',
                text: 'var(--color-text)',
                border: 'var(--color-border)',
                muted: 'var(--color-muted)',

                success: 'var(--color-success)',
                error: 'var(--color-error)',
                warning: 'var(--color-warning)',
                info: 'var(--color-info)',
                unavailable: 'var(--color-unavailable)',

                // text “on-”:
                'on-primary': 'var(--color-on-primary)',
                'on-secondary': 'var(--color-on-secondary)',
                'on-accent': 'var(--color-on-accent)',
                'on-background': 'var(--color-on-background)',
                'on-background-accent': 'var(--color-on-background-accent)',
                'on-success': 'var(--color-on-success)',
                'on-error': 'var(--color-on-error)',
                'on-warning': 'var(--color-on-warning)',
                'on-info': 'var(--color-on-info)',
                'on-unavailable': 'var(--color-on-unavailable)',
            },
        },
        keyframes: { 'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } } },
        animation: {
            fadeIn: 'fadeIn 0.3s ease-out',
            slideIn: 'slideIn 0.3s ease-out',
            // ... más animaciones
        },
    },
    darkMode: 'class',
    safelist: [
        // cualquier clase bg-*, text-*, border-* con guiones y letras/dígitos
        { pattern: /^(bg|text|border)-[a-z0-9-]+$/ },
    ],
    plugins: [
        plugin(function ({ addUtilities, theme }) {
            const utilities = Object.entries(bgAutoColors).reduce((acc, [bgKey, textKey]) => {
                // console.log(`bgKe
                // y: ${bgKey}, textKey: ${textKey}`)
                const bgColor = theme(`colors.${bgKey}`)

                let textColor = theme(`colors.${textKey}`)
                // si es una variacion de un color principal, elegir el mismo color del color principal
                if (!textColor && (textKey.match(/-/g) || []).length >= 2) {
                    // toma todo menos la última parte
                    const mainColorKey = textKey.split('-').slice(0, -1).join('-')
                    console.log(
                        `No text color for ${bgKey}, using main color ${mainColorKey} instead`
                    )
                    textColor = theme(`colors.${mainColorKey}`)
                }

                console.log(
                    `Adding utility for bg-${bgKey}-auto with bgColor: ${bgColor}, textColor: ${textColor}`
                )
                acc[`.bg-${bgKey}-auto`] = {
                    backgroundColor: bgColor,
                    color: textColor,
                }
                console.log(acc[`.bg-${bgKey}-auto`])
                return acc
            }, {})

            addUtilities(utilities, ['responsive', 'hover', 'focus'])
        }),
    ],
}
