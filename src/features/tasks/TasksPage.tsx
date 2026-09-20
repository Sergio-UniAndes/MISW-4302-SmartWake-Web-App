import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { Footer } from '../../components/Footer'
import { StatusTag } from '../../components/StatusTag'
import { ShellTopBar } from '../../layout/ShellTopBar'
import { AddTaskDialog } from './AddTaskDialog'
import { CreateTagDialog } from './CreateTagDialog'
import { IndependentTasksCard } from './IndependentTasksCard'
import { SuggestedTasksCard } from './SuggestedTasksCard'
import { addIndependentTask, addTag, useTasksState } from './tasksStore'

// Figma: "Vista Gestión de Tareas" — base (310:993), after creating a task (363:348) and a tag (363:497).
export function TasksPage() {
  const { tags, suggestedTasks, independentTasks } = useTasksState()
  const [searchQuery, setSearchQuery] = useState('')
  const [taskDialog, setTaskDialog] = useState({ open: false, key: 0, initialTitle: '' })
  const [tagDialog, setTagDialog] = useState({ open: false, key: 0 })

  const openTaskDialog = (initialTitle: string) =>
    setTaskDialog((current) => ({ open: true, key: current.key + 1, initialTitle }))
  const closeTaskDialog = () => setTaskDialog((current) => ({ ...current, open: false }))
  const openTagDialog = () => setTagDialog((current) => ({ open: true, key: current.key + 1 }))
  const closeTagDialog = () => setTagDialog((current) => ({ ...current, open: false }))

  return (
    <>
      <ShellTopBar title="Dashboard">
        <StatusTag sx={{ px: 1, fontWeight: 600 }}>Modo tareas activo</StatusTag>
      </ShellTopBar>

      <Box
        component="main"
        sx={{
          flex: 1,
          p: { xs: 2, sm: 4, md: 6 },
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          containerType: 'inline-size',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <StatusTag>Gestión de Tareas M3</StatusTag>
          <Typography variant="h1" sx={{ fontSize: { xs: 26, sm: 32 } }}>
            ¿Quieres ver tareas relacionadas a una actividad o prefieres agregar una independiente?
          </Typography>
          <Typography sx={{ maxWidth: 800, color: 'text.secondary' }}>
            Selecciona una de nuestras sugerencias predefinidas basadas en tu rutina o crea tareas personalizadas para
            tu despertar.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr)',
            alignItems: 'start',
            gap: { xs: 3, md: 4 },
            '@container (min-width: 760px)': { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' },
          }}
        >
          <SuggestedTasksCard tasks={suggestedTasks} tags={tags} onCreateTag={openTagDialog} />
          <IndependentTasksCard
            tasks={independentTasks}
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            onAddTask={() => openTaskDialog('')}
          />
        </Box>
      </Box>

      <Footer />

      <AddTaskDialog
        key={`task-${taskDialog.key}`}
        open={taskDialog.open}
        initialTitle={taskDialog.initialTitle}
        tags={tags}
        onClose={closeTaskDialog}
        onCreate={(task) => {
          addIndependentTask(task)
          closeTaskDialog()
        }}
      />
      <CreateTagDialog
        key={`tag-${tagDialog.key}`}
        open={tagDialog.open}
        onClose={closeTagDialog}
        onCreate={(name) => {
          addTag(name)
          closeTagDialog()
        }}
      />
    </>
  )
}
