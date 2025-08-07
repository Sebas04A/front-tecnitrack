// src/themes/types.ts
export interface ThemeColors {
    primary: string
    primaryLight: string
    primaryDark: string
    secondary: string
    secondaryLight: string
    secondaryDark: string
    accent: string
    background: string
    backgroundAccent: string
    text: string
    border: string
    muted: string

    success: string
    error: string
    warning: string
    info: string
    unavailable: string

    //text colors for contrast
    onPrimary: string
    onPrimaryLight: string
    onPrimaryDark: string
    onSecondary: string
    onAccent: string
    onBackground: string
    onBackgroundAccent?: string
    onSuccess: string
    onError: string
    onWarning: string
    onInfo: string
    onUnavailable: string
}
