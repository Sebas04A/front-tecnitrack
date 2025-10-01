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
                xs: '0.75rem', // 12px
                sm: '0.813rem', // 13px
                base: '0.875rem', // 14px (Este es el cambio más importante)
                lg: '1rem', // 16px
                xl: '1.125rem', // 18px
                '2xl': '1.25rem', // 20px
                '3xl': '1.5rem', // 24px
                '4xl': '1.875rem', // 30px
            },
            // --- ESPACIADO MÁS COMPACTO ---
            spacing: {
                1: '0.25rem', // 4px
                2: '0.5rem', // 8px
                3: '0.75rem', // 12px
                4: '1rem', // 16px (Clases como p-4, m-4, gap-4 serán más pequeñas)
                5: '1.25rem', // 20px
                6: '1.5rem', // 24px
                8: '1.75rem', // 28px (antes era 2rem/32px)
                10: '2.25rem', // 36px (antes era 2.5rem/40px)
                12: '2.75rem', // 44px (antes era 3rem/48px)
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
