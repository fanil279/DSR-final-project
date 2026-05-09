import { useParams } from 'react-router-dom'
import { useGetTaskQuery } from '../../features/tasks/tasksApi'

export default function TaskDetailPage() {
  const { id } = useParams()
  const { data, isLoading } = useGetTaskQuery(id!)

  if (isLoading) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Loading task...</p>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="p-6">
        <p className="text-red-500">Task not found</p>
      </div>
    )
  }

  const statusColor =
    data.status === 'DONE'
      ? 'bg-green-100 text-green-700'
      : data.status === 'IN_PROGRESS'
      ? 'bg-yellow-100 text-yellow-700'
      : 'bg-gray-100 text-gray-700'

  const priorityColor =
    data.priority === 'HIGH'
      ? 'bg-red-100 text-red-700'
      : data.priority === 'MEDIUM'
      ? 'bg-orange-100 text-orange-700'
      : 'bg-blue-100 text-blue-700'

  const visibilityColor =
    data.visibility === 'PUBLIC'
      ? 'bg-purple-100 text-purple-700'
      : 'bg-gray-200 text-gray-700'

  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow p-6">
        <h1 className="text-3xl font-bold mb-2">
          {data.title}
        </h1>

        <p className="text-gray-600 mb-6">
          {data.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          <span className={`px-3 py-1 rounded-full text-sm ${statusColor}`}>
            {data.status}
          </span>

          <span className={`px-3 py-1 rounded-full text-sm ${priorityColor}`}>
            {data.priority}
          </span>

          <span className={`px-3 py-1 rounded-full text-sm ${visibilityColor}`}>
            {data.visibility}
          </span>
        </div>

        <div className="border-t pt-4 text-sm text-gray-500">
          Task ID: {data.id}
        </div>
      </div>
    </div>
  )
}
