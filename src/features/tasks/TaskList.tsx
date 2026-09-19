import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { AssetIcon } from '../../components/AssetIcon'
import { taskIcons } from './taskIcons'
import type { Task } from './tasksStore'

// Task tag chip colors as drawn in Figma ("tag-*"); they are not part of the Warm Dawn token table.
const taskTag = { bg: '#3C322D', border: '#645046', text: '#DCC8B9' }

type TaskListProps = {
  tasks: Task[]
  label: string
}

// Figma: "Task List Items" / "Task Item" (Vista Gestión de Tareas).
export function TaskList({ tasks, label }: TaskListProps) {
  return (
    <Box
      component="ul"
      aria-label={label}
      sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexDirection: 'column', gap: 1.5 }}
    >
      {tasks.map((task) => (
        <Box
          component="li"
          key={task.id}
          sx={{
            p: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1.5,
            bgcolor: 'surfaceContainer',
            border: 1,
            borderColor: 'divider',
            borderRadius: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                flexShrink: 0,
                display: 'grid',
                placeItems: 'center',
                borderRadius: '16px',
                bgcolor: 'secondary.container',
              }}
            >
              <AssetIcon icon={taskIcons.taskCheck} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px', minWidth: 0 }}>
              <Typography sx={{ fontSize: 14, fontWeight: 600, lineHeight: 'normal', overflowWrap: 'anywhere' }}>
                {task.title}
              </Typography>
              <Box
                component="span"
                sx={{
                  px: '10px',
                  py: 0.5,
                  borderRadius: '12px',
                  border: `1px solid ${taskTag.border}`,
                  bgcolor: taskTag.bg,
                  color: taskTag.text,
                  fontSize: 12,
                  lineHeight: 'normal',
                  whiteSpace: 'nowrap',
                }}
              >
                {task.tag}
              </Box>
            </Box>
          </Box>
          <Box
            component="span"
            sx={{ flexShrink: 0, fontSize: 12, fontWeight: 500, lineHeight: 'normal', color: taskTag.text, opacity: 0.8 }}
          >
            {task.minutes} min
          </Box>
        </Box>
      ))}
    </Box>
  )
}
