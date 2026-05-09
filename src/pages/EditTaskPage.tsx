import { useNavigate, useParams } from 'react-router-dom'

import TaskForm from '../components/TaskForm'

import {
  useGetTaskQuery,
  useUpdateTaskMutation,
} from '../features/tasksApi'

export default function EditTaskPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data, isLoading } = useGetTaskQuery(id!)
  const [updateTask, { isLoading: isUpdating }] =
    useUpdateTaskMutation()

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>Task not found</p>

  return (
    <div className="p-6">
      <TaskForm
        isLoading={isUpdating}
        initialValues={{
          title: data.title,
          description: data.description,
          status: data.status,
          priority: data.priority,
          visibility: data.visibility,
        }}
        onSubmit={async (values) => {
          await updateTask({
            id: id!,
            ...values,
            viewerUserIds: data.viewerUserIds, // ✅ FIX HERE
          }).unwrap()

          navigate('/tasks')
        }}
      />
    </div>
  )
}
