import { useState } from 'react'

import type {
  TaskPriority,
  TaskStatus,
  TaskVisibility,
} from '../types'

interface Props {
  initialValues?: {
    title: string
    description: string
    status: TaskStatus
    priority: TaskPriority
    visibility: TaskVisibility
  }

  onSubmit: (data: {
    title: string
    description: string
    status: TaskStatus
    priority: TaskPriority
    visibility: TaskVisibility
  }) => void

  isLoading?: boolean
}

export default function TaskForm({
  initialValues,
  onSubmit,
  isLoading,
}: Props) {
  const [title, setTitle] = useState(initialValues?.title || '')
  const [description, setDescription] = useState(initialValues?.description || '')
  const [status, setStatus] = useState<TaskStatus>(initialValues?.status || 'TODO')
  const [priority, setPriority] = useState<TaskPriority>(initialValues?.priority || 'LOW')

  const [visibility, setVisibility] = useState<TaskVisibility>(
    initialValues?.visibility || 'ONLY_ME'
  )

  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!title.trim()) {
      setError('Title is required')
      return
    }

    if (!description.trim()) {
      setError('Description is required')
      return
    }

    onSubmit({
      title,
      description,
      status,
      priority,
      visibility,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">

      <h1 className="text-2xl font-bold">Task Form</h1>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="input h-32"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as TaskStatus)}
        className="input"
      >
        <option value="TODO">TODO</option>
        <option value="IN_PROGRESS">IN PROGRESS</option>
        <option value="DONE">DONE</option>
      </select>

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as TaskPriority)}
        className="input"
      >
        <option value="LOW">LOW</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="HIGH">HIGH</option>
      </select>

      <select
        value={visibility}
        onChange={(e) => setVisibility(e.target.value as TaskVisibility)}
        className="input"
      >
        <option value="ONLY_ME">Only me</option>
        <option value="LIST">List</option>
        <option value="ANYONE">Anyone</option>
      </select>

      {error && <p className="text-red-500">{error}</p>}

      <button
        disabled={isLoading}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {isLoading ? 'Loading...' : 'Submit'}
      </button>
    </form>
  )
}
