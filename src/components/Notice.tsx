import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Snackbar, { type SnackbarCloseReason } from '@mui/material/Snackbar'
import SnackbarContent from '@mui/material/SnackbarContent'
import closeIcon from '../assets/icons/x.svg'

type NoticeProps = {
  open: boolean
  message: string
  /** Optional 20×20 leading icon URL. */
  icon?: string
  onClose: () => void
}

/** Bottom-centered snackbar with an optional leading icon and a close button. */
export function Notice({ open, message, icon, onClose }: NoticeProps) {
  const handleClose = (_event: unknown, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') return
    onClose()
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      // 96px clears the page footer (Figma) and the 80px mobile navigation bar.
      sx={{ bottom: { xs: 96, sm: 96 } }}
    >
      <SnackbarContent
        message={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {icon && (
              <Box
                component="img"
                src={icon}
                alt=""
                sx={{ width: 20, height: 20, flexShrink: 0, display: 'block' }}
              />
            )}
            <span>{message}</span>
          </Box>
        }
        action={
          <IconButton aria-label="Cerrar" onClick={onClose} sx={{ p: 0.75 }}>
            <Box
              component="img"
              src={closeIcon}
              alt=""
              sx={{ width: 20, height: 20, display: 'block' }}
            />
          </IconButton>
        }
        sx={{
          width: { sm: 344 },
          minWidth: { sm: 344 },
          minHeight: 48,
          px: 2,
          // 3px + 1px border keeps the two-line snackbar at 48px, as in Figma.
          py: '3px',
          flexWrap: 'nowrap',
          bgcolor: 'tertiary.container',
          color: 'text.primary',
          border: 1,
          borderColor: 'divider',
          borderRadius: 1,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
          typography: 'body2',
          lineHeight: '20px',
          '& .MuiSnackbarContent-message': { py: 0, flex: 1 },
          '& .MuiSnackbarContent-action': { pl: 1.5, mr: -0.75 },
        }}
      />
    </Snackbar>
  )
}
