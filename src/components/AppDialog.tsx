import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import type { FormEvent, ReactNode } from 'react'

type AppDialogProps = {
  open: boolean
  onClose: () => void
  /** Accessible name: id of the dialog's title element. */
  labelledBy: string
  width: number
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  children: ReactNode
}

/**
 * Centered modal form, as the Figma prototype overlays: 25% black scrim, closes on click outside or Escape.
 * Chrome from "Create Tag Dialog" (343:777).
 */
export function AppDialog({ open, onClose, labelledBy, width, onSubmit, children }: AppDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby={labelledBy}
      slotProps={{
        backdrop: { sx: { bgcolor: 'rgba(0, 0, 0, 0.25)' } },
        paper: {
          sx: {
            width,
            maxWidth: 'calc(100% - 32px)',
            m: 2,
            bgcolor: 'background.paper',
            border: 1,
            borderColor: 'divider',
            borderRadius: '20px',
            boxShadow: '0 8px 12px rgba(0, 0, 0, 0.5)',
          },
        },
      }}
    >
      <Box
        component="form"
        noValidate
        onSubmit={onSubmit}
        sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}
      >
        {children}
      </Box>
    </Dialog>
  )
}
