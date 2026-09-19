import TextField, { type TextFieldProps } from '@mui/material/TextField'
import { hoverLayer } from '../theme'

/**
 * M3 filled text field as drawn in the Figma dialogs ("Text field", 3:17187):
 * 56px, surface-container fill with outline border, 12px label that turns primary on focus.
 */
export function FilledTextField(props: Omit<TextFieldProps, 'variant'>) {
  return (
    <TextField
      {...props}
      variant="filled"
      fullWidth
      sx={{
        '& .MuiFilledInput-root': {
          bgcolor: 'surfaceContainer',
          border: 1,
          borderBottom: 0,
          borderColor: 'divider',
          borderRadius: '4px 4px 0 0',
          '&:hover, &.Mui-focused': { bgcolor: 'surfaceContainer' },
          '&:hover': { backgroundImage: hoverLayer },
          '&::before': { borderBottomColor: 'text.primary' },
          '&:hover:not(.Mui-disabled, .Mui-error)::before': { borderBottomColor: 'text.primary' },
          '&::after': { borderBottomColor: 'primary.main' },
        },
        '& .MuiFilledInput-input': { px: 2, fontSize: 16, letterSpacing: '0.5px' },
        '& .MuiInputLabel-filled': {
          color: 'text.secondary',
          fontWeight: 600,
          transform: 'translate(16px, 17px) scale(1)',
          '&.MuiInputLabel-shrink': { transform: 'translate(16px, 7px) scale(0.75)' },
          '&.Mui-focused': { color: 'primary.main' },
          '&.Mui-error': { color: 'error.main' },
        },
        '& .MuiFormHelperText-root': { mx: 2, fontSize: 12, letterSpacing: '0.4px' },
        '& .MuiFormHelperText-root:not(.Mui-error)': { color: 'text.secondary' },
      }}
    />
  )
}
