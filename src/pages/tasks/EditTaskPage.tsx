import { useNavigate, useParams } from 'react-router-dom'
import TaskForm from '../../components/TaskForm'

import {
  useGetTaskQuery,
  useUpdateTaskMutation,
} from '../../features/tasks/tasksApi'

export default function EditTaskPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data, isLoading } = useGetTaskQuery(id!)
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation()

  if (isLoading) return <p className="p-6">Loading...</p>
  if (!data) return <p className="p-6">Task not found</p>

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

            title: values.title,
            description: values.description,
            status: values.status,
            priority: values.priority,
            visibility: values.visibility,

            viewerUserIds: data.viewerUserIds,
          }).unwrap()

          navigate('/tasks')
        }}
      />
    </div>
  )
}
