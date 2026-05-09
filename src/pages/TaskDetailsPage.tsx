import { useParams } from 'react-router-dom'

import {
  useGetTaskQuery,
} from '../features/tasksApi'

export default function TaskDetailPage() {
  const { id } = useParams()

  const { data, isLoading } =
    useGetTaskQuery(id!)

  if (isLoading)
    return <p>Loading...</p>

  if (!data)
    return <p>Task not found</p>

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">
        {data.title}
      </h1>

      <p className="mt-2">
        {data.description}
      </p>

      <div className="mt-4 text-sm">
        Status: {data.status}
      </div>

      <div className="text-sm">
        Priority: {data.priority}
      </div>
    </div>
  )
}
