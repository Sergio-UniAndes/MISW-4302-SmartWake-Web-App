import { createTheme } from '@mui/material/styles'

// "M3 Warm Dawn" dark theme.
// Source: Figma › Web Mockups › Dark-Theme-Panel › "1. Color Token Mapping".
const tokens = {
  primary: '#FF8C69',
  onPrimary: '#2E0E00',
  primaryContainer: '#4A2012',
  onPrimaryContainer: '#FFECE5',
  secondary: '#FFBF69',
  secondaryContainer: '#543D11',
  onSecondaryContainer: '#FFF5D9',
  tertiary: '#F5EBE0',
  tertiaryContainer: '#2D2721',
  background: '#1C1917',
  surface: '#2E2A27',
  surfaceContainer: '#24211F',
  onSurface: '#F5EBE0',
  onSurfaceVariant: '#CAC4D0',
  outline: '#3E362C',
  // Not defined in the Figma token table; M3 baseline dark error.
  error: '#FFB4AB',
}

/** Placeholder color of the Tareas inputs (M3 outline #938F99; not in the Warm Dawn table). */
export const placeholderColor = '#938F99'

/** M3 hover state layer: 8% of on-surface, painted over the element's background. */
export const hoverLayer = 'linear-gradient(rgba(245, 235, 224, 0.08), rgba(245, 235, 224, 0.08))'

declare module '@mui/material/styles' {
  interface PaletteColor {
    container?: string
    onContainer?: string
  }
  interface SimplePaletteColorOptions {
    container?: string
    onContainer?: string
  }
  interface Palette {
    tertiary: PaletteColor
    surfaceContainer: string
  }
  interface PaletteOptions {
    tertiary?: SimplePaletteColorOptions
    surfaceContainer?: string
  }
}

const baseTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: tokens.primary,
      contrastText: tokens.onPrimary,
      container: tokens.primaryContainer,
      onContainer: tokens.onPrimaryContainer,
    },
    secondary: {
      main: tokens.secondary,
      contrastText: tokens.onPrimary,
      container: tokens.secondaryContainer,
      onContainer: tokens.onSecondaryContainer,
    },
    tertiary: {
      main: tokens.tertiary,
      container: tokens.tertiaryContainer,
    },
    error: { main: tokens.error },
    background: {
      default: tokens.background,
      paper: tokens.surface,
    },
    surfaceContainer: tokens.surfaceContainer,
    text: {
      primary: tokens.onSurface,
      secondary: tokens.onSurfaceVariant,
    },
    divider: tokens.outline,
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
    h1: { fontSize: 44, fontWeight: 700, lineHeight: 'normal' },
    h2: { fontSize: 20, fontWeight: 700, lineHeight: 'normal' },
    body1: { fontSize: 16, fontWeight: 400, lineHeight: '24px' },
    body2: { fontSize: 14, fontWeight: 400, lineHeight: '22px' },
    caption: { fontSize: 13, fontWeight: 400, lineHeight: '18px' },
    subtitle2: { fontSize: 12, fontWeight: 700, lineHeight: 'normal' },
    overline: {
      fontSize: 11,
      fontWeight: 700,
      lineHeight: 'normal',
      letterSpacing: 0,
      textTransform: 'uppercase',
    },
    button: { fontSize: 14, fontWeight: 700, lineHeight: 'normal', textTransform: 'none' },
  },
})

export const theme = createTheme(baseTheme, {
  typography: {
    h1: {
      [baseTheme.breakpoints.down('sm')]: { fontSize: 32 },
    },
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          '&.Mui-focusVisible': { outline: `2px solid ${tokens.primary}`, outlineOffset: 2 },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    MuiCard: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: {
        root: { borderRadius: 16 },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 8, padding: '12px 24px' },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: tokens.surface,
          borderRadius: 8,
          '& .MuiOutlinedInput-notchedOutline': { borderColor: tokens.outline },
          '&:hover:not(.Mui-focused):not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
            borderColor: tokens.onSurfaceVariant,
          },
        },
        input: {
          padding: '12px 16px',
          fontSize: 14,
          fontWeight: 500,
          lineHeight: 'normal',
          height: 'auto',
          '&::placeholder': { color: tokens.onSurfaceVariant, opacity: 1 },
        },
      },
    },
    MuiLink: {
      defaultProps: { underline: 'hover', color: 'inherit' },
    },
  },
})
