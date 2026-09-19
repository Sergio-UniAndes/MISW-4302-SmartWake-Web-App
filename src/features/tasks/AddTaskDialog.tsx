import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import InputBase from '@mui/material/InputBase'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import { useState, type FormEvent } from 'react'
import { AppDialog } from '../../components/AppDialog'
import { AssetIcon } from '../../components/AssetIcon'
import { CircleIconButton } from '../../components/CircleIconButton'
import { FilledTextField } from '../../components/FilledTextField'
import { hoverLayer } from '../../theme'
import { taskIcons } from './taskIcons'
import type { Task } from './tasksStore'

type AddTaskDialogProps = {
  open: boolean
  initialTitle: string
  tags: string[]
  onClose: () => void
  onCreate: (task: Omit<Task, 'id'>) => void
}

const DEFAULT_MINUTES = '30'
const DEFAULT_TAG = 'Rutina'
const MAX_MINUTES = 600
const CATEGORY_LABEL_ID = 'task-category-label'

const sectionLabel = { fontSize: 13, fontWeight: 500, lineHeight: 'normal', color: 'text.secondary' } as const

function ChevronDown() {
  // The Figma chevron points backwards; rotate it to read as a dropdown.
  return <AssetIcon icon={taskIcons.chevron} tinted sx={{ mr: 2, color: 'text.secondary', transform: 'rotate(-90deg)' }} />
}

// Figma: "vista-agregar-tarea-independiente" (319:10612), adapted to the Warm Dawn design system.
// Mount with a new `key` each time it opens so the form starts fresh.
export function AddTaskDialog({ open, initialTitle, tags, onClose, onCreate }: AddTaskDialogProps) {
  const [title, setTitle] = useState(initialTitle)
  const [minutes, setMinutes] = useState(DEFAULT_MINUTES)
  const [tag, setTag] = useState(tags.includes(DEFAULT_TAG) ? DEFAULT_TAG : tags[0])
  const [errors, setErrors] = useState<{ title?: string; minutes?: string }>({})

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = title.trim()
    const parsedMinutes = Number(minutes)
    const nextErrors = {
      title: trimmed ? undefined : 'Escribe un título para la tarea.',
      minutes:
        Number.isInteger(parsedMinutes) && parsedMinutes > 0 && parsedMinutes <= MAX_MINUTES
          ? undefined
          : `Ingresa un tiempo entre 1 y ${MAX_MINUTES} minutos.`,
    }
    setErrors(nextErrors)
    if (nextErrors.title || nextErrors.minutes) return
    onCreate({ title: trimmed, minutes: parsedMinutes, tag })
  }

  return (
    <AppDialog open={open} onClose={onClose} labelledBy="add-task-title" width={443} onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CircleIconButton icon={taskIcons.arrowBack} label="Volver" onClick={onClose} variant="tonal" />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px', lineHeight: 'normal' }}>
            <Box component="span" sx={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: 'secondary.main' }}>
              Nueva tarea
            </Box>
            <Typography id="add-task-title" component="h2" sx={{ fontSize: 18, fontWeight: 700, lineHeight: 'normal' }}>
              Tarea independiente
            </Typography>
          </Box>
        </Box>
        <CircleIconButton
          icon={taskIcons.info}
          label="Crea tareas individuales y flexibles para tu despertar"
          variant="tonal"
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography sx={sectionLabel}>¿Qué tienes en mente?</Typography>
          <FilledTextField
            label="Título"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value)
              setErrors((current) => ({ ...current, title: undefined }))
            }}
            error={Boolean(errors.title)}
            helperText={errors.title}
            autoFocus
            slotProps={{ htmlInput: { maxLength: 80, autoComplete: 'off' } }}
          />
        </Box>

        <FilledTextField
          label="Tiempo (min)"
          value={minutes}
          onChange={(event) => {
            setMinutes(event.target.value.replace(/\D/g, ''))
            setErrors((current) => ({ ...current, minutes: undefined }))
          }}
          error={Boolean(errors.minutes)}
          helperText={errors.minutes}
          slotProps={{ htmlInput: { inputMode: 'numeric', maxLength: 3, autoComplete: 'off' } }}
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography id={CATEGORY_LABEL_ID} sx={sectionLabel}>
            Categoría o etiqueta
          </Typography>
          <Select
            value={tag}
            onChange={(event) => setTag(event.target.value)}
            input={<InputBase />}
            IconComponent={ChevronDown}
            inputProps={{ 'aria-labelledby': CATEGORY_LABEL_ID }}
            renderValue={(value) => (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <AssetIcon icon={taskIcons.tag} tinted sx={{ color: 'secondary.main' }} />
                {value}
              </Box>
            )}
            sx={{
              bgcolor: 'surfaceContainer',
              border: 1,
              borderColor: 'divider',
              borderRadius: 2,
              fontSize: 15,
              fontWeight: 500,
              '&:hover': { backgroundImage: hoverLayer },
              '&.Mui-focused': { borderColor: 'primary.main' },
              '& .MuiSelect-select': { p: 2, lineHeight: 'normal' },
              '& .MuiSelect-icon': { top: 'calc(50% - 8px)' },
            }}
          >
            {tags.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>

      <ButtonBase
        type="submit"
        sx={{
          width: '100%',
          p: 2,
          gap: 1,
          borderRadius: 2,
          bgcolor: 'primary.container',
          color: 'primary.onContainer',
          fontSize: 16,
          fontWeight: 700,
          lineHeight: 'normal',
          '&:hover': { backgroundImage: hoverLayer },
        }}
      >
        <AssetIcon icon={taskIcons.check} tinted />
        Crear tarea
      </ButtonBase>
    </AppDialog>
  )
}
