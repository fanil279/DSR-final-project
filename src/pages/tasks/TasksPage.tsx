import { useState } from 'react'
import { Link } from 'react-router-dom'

import {
  useGetTasksQuery,
  useDeleteTaskMutation,
  type TaskStatus,
  type TaskPriority,
} from '../../features/tasks/tasksApi'

import { useAppSelector } from '../../hooks/redux'
import { getUserFromToken } from '../../utils/getUserFromToken'

import type { Task } from '../../features/tasks/taskTypes'

export default function TasksPage() {
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState<TaskStatus | ''>('')
  const [priority, setPriority] = useState<TaskPriority | ''>('')

  const token = useAppSelector((state) => state.auth.token)
  const user = getUserFromToken(token)
  const currentUserId = user?.sub

  const { data, isLoading, isError, refetch } = useGetTasksQuery({
    page,
    pageSize: 10,
    status: status ? [status] : undefined,
    priority: priority ? [priority] : undefined,
    sort: 'updatedAt',
    order: 'desc',
  })

  const [deleteTask] = useDeleteTaskMutation()

  if (isLoading) return <p className="p-6">Loading...</p>

  if (isError) {
    return (
      <div className="p-6">
        <p className="text-red-500">Failed to load tasks</p>
        <button onClick={() => refetch()} className="underline">
          Retry
        </button>
      </div>
    )
  }

  const tasks = data?.items as unknown as Task[] ?? []

  return (
    <div className="p-6 space-y-4">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tasks</h1>

        <Link to="/tasks/new" className="bg-black text-white px-4 py-2 rounded">
          Create Task
        </Link>
      </div>

      {/* FILTERS */}
      <div className="flex gap-2">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus | '')}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Status</option>
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as TaskPriority | '')}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Priority</option>
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => {
          const isOwner = task.creator?.id === currentUserId

          return (
            <div
              key={task.id}
              className="border p-4 rounded flex justify-between"
            >
              <Link to={`/tasks/${task.id}`}>
                <h2 className="font-bold">{task.title}</h2>
                <p className="text-sm text-gray-500">
                  {task.status} • {task.priority}
                </p>
              </Link>

              {isOwner && (
                <div className="flex gap-2">
                  <Link to={`/tasks/${task.id}/edit`} className="text-blue-500">
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="flex gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
        >
          Prev
        </button>

        <span>Page {page}</span>

        <button
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}
