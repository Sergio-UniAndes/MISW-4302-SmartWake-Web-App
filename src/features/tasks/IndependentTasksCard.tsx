import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Card from '@mui/material/Card'
import InputBase from '@mui/material/InputBase'
import Typography from '@mui/material/Typography'
import type { FormEvent } from 'react'
import { AssetIcon } from '../../components/AssetIcon'
import { hoverLayer, placeholderColor } from '../../theme'
import { CardHeader } from './CardHeader'
import { TaskList } from './TaskList'
import { taskIcons } from './taskIcons'
import type { Task } from './tasksStore'

type IndependentTasksCardProps = {
  tasks: Task[]
  quickTitle: string
  onQuickTitleChange: (value: string) => void
  /** Opens the add-task dialog, prefilled with `title` (empty from the main button). */
  onAddTask: (title: string) => void
}

const QUICK_INPUT_ID = 'quick-task-title'

// Figma: "Right Setup Card" — independent tasks, with quick-add row, empty state and main add button.
export function IndependentTasksCard({ tasks, quickTitle, onQuickTitleChange, onAddTask }: IndependentTasksCardProps) {
  const handleQuickAdd = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onAddTask(quickTitle.trim())
  }

  return (
    <Card
      component="section"
      aria-labelledby="independent-tasks-title"
      sx={{ p: { xs: 3, md: 4 }, display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      <CardHeader
        id="independent-tasks-title"
        title="Tareas independientes"
        subtitle="Crea tareas individuales y flexibles"
        badge="Personalizado"
      />

      <Box
        component="form"
        onSubmit={handleQuickAdd}
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          bgcolor: 'surfaceContainer',
          border: 1,
          borderColor: 'divider',
          borderRadius: 1.5,
        }}
      >
        <Typography component="label" htmlFor={QUICK_INPUT_ID} variant="overline" sx={{ color: 'secondary.main' }}>
          Nueva tarea
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <InputBase
            id={QUICK_INPUT_ID}
            value={quickTitle}
            onChange={(event) => onQuickTitleChange(event.target.value)}
            placeholder="Escribe una nueva tarea para hoy..."
            inputProps={{ autoComplete: 'off', maxLength: 80 }}
            sx={{
              flex: 1,
              minWidth: 0,
              px: 2,
              py: 1.5,
              bgcolor: 'tertiary.container',
              border: 1,
              borderColor: 'divider',
              borderRadius: 1,
              fontSize: 14,
              fontWeight: 500,
              '&.Mui-focused': { borderColor: 'primary.main' },
              '& input': { p: 0, height: 'auto', lineHeight: 'normal' },
              '& input::placeholder': { color: placeholderColor, opacity: 1 },
            }}
          />
          <ButtonBase
            type="submit"
            aria-label="Agregar tarea"
            sx={{
              width: 44,
              height: 44,
              flexShrink: 0,
              borderRadius: 1,
              bgcolor: 'primary.container',
              '&:hover': { backgroundImage: hoverLayer },
            }}
          >
            <AssetIcon icon={taskIcons.addQuick} />
          </ButtonBase>
        </Box>
      </Box>

      {tasks.length > 0 ? (
        <TaskList tasks={tasks} label="Tareas independientes" />
      ) : (
        <Box sx={{ py: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, textAlign: 'center' }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              display: 'grid',
              placeItems: 'center',
              borderRadius: '24px',
              bgcolor: 'secondary.container',
            }}
          >
            <AssetIcon icon={taskIcons.play} />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.75, lineHeight: 'normal' }}>
            <Typography sx={{ fontSize: 16, fontWeight: 700, lineHeight: 'normal' }}>
              Aún no hay tareas independientes
            </Typography>
            <Typography sx={{ maxWidth: 320, fontSize: 13, lineHeight: 'normal', color: 'text.secondary' }}>
              Escribe una tarea arriba o pulsa el botón para comenzar a configurar tu día.
            </Typography>
          </Box>
        </Box>
      )}

      <ButtonBase
        onClick={() => onAddTask('')}
        sx={{
          width: '100%',
          py: 1.75,
          gap: 1,
          borderRadius: 1.5,
          bgcolor: 'primary.container',
          color: 'primary.onContainer',
          fontSize: 14,
          fontWeight: 700,
          lineHeight: 'normal',
          '&:hover': { backgroundImage: hoverLayer },
        }}
      >
        <AssetIcon icon={taskIcons.addFab} />
        Agregar tarea independiente
      </ButtonBase>
    </Card>
  )
}
