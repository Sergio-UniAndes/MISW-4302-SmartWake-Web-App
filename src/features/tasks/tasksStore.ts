import { useSyncExternalStore } from 'react'

export type Task = {
  id: string
  title: string
  tag: string
  minutes: number
}

type TasksState = {
  tags: string[]
  suggestedTasks: Task[]
  independentTasks: Task[]
}

// In-memory mock store: survives navigation between pages, resets on reload. Replace with the API once it exists.
// Initial data mirrors the Figma "Vista Gestión de Tareas" frame (310:993).
let state: TasksState = {
  tags: ['Ejercicio', 'Rutina', 'Viajes'],
  suggestedTasks: [
    { id: 'maleta', title: 'Preparar maleta de deporte', tag: 'Ejercicio', minutes: 30 },
    { id: 'pasaporte', title: 'Revisar pasaporte y documentos', tag: 'Viajes', minutes: 15 },
    { id: 'laptop', title: 'Cargar laptop y tablet', tag: 'Rutina', minutes: 20 },
  ],
  independentTasks: [],
}

const listeners = new Set<() => void>()
let nextId = 1

function setState(next: TasksState) {
  state = next
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useTasksState() {
  return useSyncExternalStore(subscribe, () => state)
}

/** Lowercase and strip accents, for search and duplicate checks ("Café" matches "cafe"). */
export function normalizeText(value: string) {
  return value.normalize('NFD').replace(/\p{Diacritic}/gu, '').trim().toLowerCase()
}

export function tagExists(name: string) {
  const key = normalizeText(name)
  return state.tags.some((tag) => normalizeText(tag) === key)
}

export function addTag(name: string) {
  setState({ ...state, tags: [...state.tags, name.trim()] })
}

export function addIndependentTask(task: Omit<Task, 'id'>) {
  const created = { ...task, id: `task-${nextId++}` }
  setState({ ...state, independentTasks: [...state.independentTasks, created] })
}
