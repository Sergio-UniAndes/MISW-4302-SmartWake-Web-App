import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useState, type FormEvent } from 'react'
import { AppDialog } from '../../components/AppDialog'
import { AssetIcon } from '../../components/AssetIcon'
import { CircleIconButton } from '../../components/CircleIconButton'
import { FilledTextField } from '../../components/FilledTextField'
import { hoverLayer } from '../../theme'
import { taskIcons } from './taskIcons'
import { tagExists } from './tasksStore'

type CreateTagDialogProps = {
  open: boolean
  onClose: () => void
  onCreate: (name: string) => void
}

const pillButton = {
  height: 40,
  px: 2,
  py: '10px',
  gap: 1,
  borderRadius: '100px',
  border: 1,
  fontSize: 14,
  lineHeight: '20px',
  letterSpacing: '0.1px',
  '&:hover': { backgroundImage: hoverLayer },
} as const

// Figma: "Create Tag Dialog" (343:777). Opened by the "+" next to the tag chips.
export function CreateTagDialog({ open, onClose, onCreate }: CreateTagDialogProps) {
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) {
      setError('Escribe un nombre para la etiqueta.')
      return
    }
    if (tagExists(trimmed)) {
      setError('Ya existe una etiqueta con ese nombre.')
      return
    }
    onCreate(trimmed)
  }

  return (
    <AppDialog open={open} onClose={onClose} labelledBy="create-tag-title" width={380} onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography id="create-tag-title" component="h2" sx={{ fontSize: 18, fontWeight: 700, lineHeight: 'normal' }}>
            Nueva etiqueta
          </Typography>
          <Typography sx={{ fontSize: 12, lineHeight: 'normal', color: 'text.secondary' }}>
            Organiza tus sugerencias de tareas
          </Typography>
        </Box>
        <CircleIconButton icon={taskIcons.close} label="Cerrar" onClick={onClose} />
      </Box>

      <FilledTextField
        label="Nombre de la etiqueta"
        value={name}
        onChange={(event) => {
          setName(event.target.value)
          setError(null)
        }}
        error={error !== null}
        helperText={error ?? 'Ej. Ejercicio, Estudio, Hogar'}
        autoFocus
        slotProps={{ htmlInput: { maxLength: 24, autoComplete: 'off' } }}
      />

      <Box sx={{ py: 1, display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap', gap: 1.5 }}>
        <Button
          onClick={onClose}
          sx={{ ...pillButton, bgcolor: 'surfaceContainer', borderColor: 'divider', color: 'text.primary', fontWeight: 600 }}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          sx={{
            ...pillButton,
            bgcolor: 'primary.container',
            borderColor: 'primary.main',
            color: 'primary.onContainer',
            fontWeight: 700,
          }}
        >
          <AssetIcon icon={taskIcons.addConfirm} tinted />
          Crear etiqueta
        </Button>
      </Box>
    </AppDialog>
  )
}
