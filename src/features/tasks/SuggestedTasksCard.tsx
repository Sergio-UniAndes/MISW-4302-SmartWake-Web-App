import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Card from '@mui/material/Card'
import InputBase from '@mui/material/InputBase'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { AssetIcon } from '../../components/AssetIcon'
import { CircleIconButton } from '../../components/CircleIconButton'
import { hoverLayer, placeholderColor } from '../../theme'
import { CardHeader } from './CardHeader'
import { TaskList } from './TaskList'
import { taskIcons } from './taskIcons'
import { normalizeText, type Task } from './tasksStore'

type SuggestedTasksCardProps = {
  tasks: Task[]
  tags: string[]
  onCreateTag: () => void
}

// Figma: "Left Feature Card" — suggested activities with tag filter chips and search.
export function SuggestedTasksCard({ tasks, tags, onCreateTag }: SuggestedTasksCardProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const needle = normalizeText(query)
  const visibleTasks = tasks.filter(
    (task) => (selectedTag === null || task.tag === selectedTag) && normalizeText(task.title).includes(needle),
  )

  const chips = [{ label: 'Todos', value: null }, ...tags.map((tag) => ({ label: tag, value: tag }))]

  return (
    <Card
      component="section"
      aria-labelledby="suggested-tasks-title"
      sx={{ p: { xs: 3, md: 4 }, display: 'flex', flexDirection: 'column', gap: 2.5 }}
    >
      <CardHeader
        id="suggested-tasks-title"
        title="Actividades sugeridas"
        subtitle="Colecciones listas para activar"
        badge={`${tasks.length} listas`}
      />

      <Box
        role="group"
        aria-label="Filtrar por etiqueta"
        sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 1 }}
      >
        {chips.map((chip) => {
          const selected = chip.value === selectedTag
          return (
            <ButtonBase
              key={chip.label}
              aria-pressed={selected}
              onClick={() => setSelectedTag(chip.value)}
              sx={{
                px: 2,
                py: '5px',
                borderRadius: '100px',
                border: 1,
                fontSize: 13,
                lineHeight: 'normal',
                '&:hover': { backgroundImage: hoverLayer },
                ...(selected
                  ? { bgcolor: 'primary.container', borderColor: 'primary.container', color: 'primary.onContainer', fontWeight: 600 }
                  : { bgcolor: 'surfaceContainer', borderColor: 'divider', color: 'text.primary', fontWeight: 400 }),
              }}
            >
              {chip.label}
            </ButtonBase>
          )
        })}
        <CircleIconButton icon={taskIcons.addTag} label="Crear etiqueta" onClick={onCreateTag} />
      </Box>

      <Box
        sx={{
          px: 2,
          py: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          bgcolor: 'surfaceContainer',
          border: 1,
          borderColor: 'divider',
          borderRadius: 1,
          '&:focus-within': { borderColor: 'primary.main' },
        }}
      >
        <AssetIcon icon={taskIcons.search} />
        <InputBase
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar tareas sugeridas..."
          inputProps={{ 'aria-label': 'Buscar tareas sugeridas' }}
          sx={{
            flex: 1,
            fontSize: 13,
            lineHeight: 'normal',
            '& input': { p: 0, height: 'auto', lineHeight: 'normal' },
            '& input::placeholder': { color: placeholderColor, opacity: 1 },
          }}
        />
      </Box>

      {visibleTasks.length > 0 ? (
        <TaskList tasks={visibleTasks} label="Actividades sugeridas" />
      ) : (
        <Typography sx={{ py: 3, fontSize: 13, textAlign: 'center', color: 'text.secondary' }}>
          No hay tareas que coincidan con tu búsqueda.
        </Typography>
      )}
    </Card>
  )
}
