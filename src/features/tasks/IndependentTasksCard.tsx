import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Card from '@mui/material/Card'
import InputBase from '@mui/material/InputBase'
import Typography from '@mui/material/Typography'
import { AssetIcon } from '../../components/AssetIcon'
import { hoverLayer, placeholderColor } from '../../theme'
import { CardHeader } from './CardHeader'
import { TaskList } from './TaskList'
import { taskIcons } from './taskIcons'
import { normalizeText, type Task } from './tasksStore'

type IndependentTasksCardProps = {
  tasks: Task[]
  searchQuery: string
  onSearchQueryChange: (value: string) => void
  onAddTask: () => void
}

const SEARCH_INPUT_ID = 'independent-task-search'

// Figma: "Right Setup Card" — independent tasks, with quick-add row, empty state and main add button.
export function IndependentTasksCard({ tasks, searchQuery, onSearchQueryChange, onAddTask }: IndependentTasksCardProps) {
  const needle = normalizeText(searchQuery)
  const visibleTasks = tasks.filter((task) => normalizeText(`${task.title} ${task.tag}`).includes(needle))

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
        badge={tasks.length === 0 ? 'Personalizado' : `${tasks.length} ${tasks.length === 1 ? 'tarea' : 'tareas'}`}
      />

      <Box
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
        <Typography component="label" htmlFor={SEARCH_INPUT_ID} variant="overline" sx={{ color: 'secondary.main' }}>
          Buscar
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <InputBase
            id={SEARCH_INPUT_ID}
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchQueryChange(event.target.value)}
            placeholder="Buscar..."
            inputProps={{ 'aria-label': 'Buscar tareas independientes', autoComplete: 'off', maxLength: 80 }}
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
            type="button"
            aria-label="Buscar tareas independientes"
            sx={{
              width: 44,
              height: 44,
              flexShrink: 0,
              borderRadius: 1,
              bgcolor: 'primary.container',
              '&:hover': { backgroundImage: hoverLayer },
            }}
          >
            <AssetIcon icon={taskIcons.search} />
          </ButtonBase>
        </Box>
      </Box>

      {visibleTasks.length > 0 ? (
        <TaskList tasks={visibleTasks} label="Tareas independientes" />
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
              {tasks.length > 0 ? 'No hay coincidencias' : 'Aún no hay tareas independientes'}
            </Typography>
            <Typography sx={{ maxWidth: 320, fontSize: 13, lineHeight: 'normal', color: 'text.secondary' }}>
              {tasks.length > 0 ? 'Prueba otra búsqueda.' : 'Escribe una tarea arriba o pulsa el botón para comenzar a configurar tu día.'}
            </Typography>
          </Box>
        </Box>
      )}

      <ButtonBase
        onClick={onAddTask}
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
