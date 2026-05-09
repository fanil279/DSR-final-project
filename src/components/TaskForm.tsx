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
  const [title, setTitle] = useState(
    initialValues?.title || ''
  )

  const [description, setDescription] = useState(
    initialValues?.description || ''
  )

  const [status, setStatus] = useState<TaskStatus>(
    initialValues?.status || 'TODO'
  )

  const [priority, setPriority] =
    useState<TaskPriority>(
      initialValues?.priority || 'LOW'
    )

  const [visibility, setVisibility] =
    useState<TaskVisibility>(
      initialValues?.visibility || 'ONLY_ME'
    )

  const [error, setError] = useState('')

  const handleSubmit = (
    e: React.FormEvent
  ) => {
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
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow"
    >
      <h1 className="text-3xl font-bold mb-6">
        Task Form
      </h1>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        className="w-full border p-3 rounded mb-4"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
        className="w-full border p-3 rounded mb-4 h-40"
      />

      <select
        value={status}
        onChange={(e) =>
          setStatus(
            e.target.value as TaskStatus
          )
        }
        className="w-full border p-3 rounded mb-4"
      >
        <option value="TODO">TODO</option>

        <option value="IN_PROGRESS">
          IN PROGRESS
        </option>

        <option value="DONE">DONE</option>
      </select>

      <select
        value={priority}
        onChange={(e) =>
          setPriority(
            e.target.value as TaskPriority
          )
        }
        className="w-full border p-3 rounded mb-4"
      >
        <option value="LOW">LOW</option>

        <option value="MEDIUM">
          MEDIUM
        </option>

        <option value="HIGH">HIGH</option>
      </select>

      <select
        value={visibility}
        onChange={(e) =>
          setVisibility(
            e.target
              .value as TaskVisibility
          )
        }
        className="w-full border p-3 rounded mb-4"
      >
        <option value="ONLY_ME">
          ONLY ME
        </option>

        <option value="PUBLIC">
          PUBLIC
        </option>
      </select>

      {error && (
        <p className="text-red-500 mb-4">
          {error}
        </p>
      )}

      <button
        disabled={isLoading}
        className="bg-black text-white px-6 py-3 rounded cursor-pointer"
      >
        {isLoading
          ? 'Loading...'
          : 'Submit'}
      </button>
    </form>
  )
}
