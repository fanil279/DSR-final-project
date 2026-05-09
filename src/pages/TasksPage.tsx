import { Link } from 'react-router-dom'

import {
  useGetTasksQuery,
  useDeleteTaskMutation,
} from '../features/tasksApi'

export default function TasksPage() {
  const { data, isLoading, error } = useGetTasksQuery()
  const [deleteTask] = useDeleteTaskMutation()

  if (isLoading) return <p>Loading...</p>

  if (error) return <p>Error loading tasks</p>

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold">Tasks</h1>

        <Link
          to="/tasks/new"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Create Task
        </Link>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {data?.items?.map((task) => (
          <div
            key={task.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            {/* LEFT SIDE */}
            <div>
              <Link to={`/tasks/${task.id}`}>
                <h2 className="font-bold">{task.title}</h2>
              </Link>

              <p className="text-sm text-gray-500">
                {task.status} • {task.priority}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 items-center">
              <Link
                to={`/tasks/${task.id}`}
                className="text-blue-500"
              >
                View
              </Link>

              <Link
                to={`/tasks/${task.id}/edit`}
                className="text-yellow-500"
              >
                Edit
              </Link>

              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
