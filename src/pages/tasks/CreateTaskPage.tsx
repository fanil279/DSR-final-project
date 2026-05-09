import { useNavigate } from 'react-router-dom'
import TaskForm from '../../components/TaskForm'
import { useCreateTaskMutation } from '../../features/tasks/tasksApi'

export default function CreateTaskPage() {
  const navigate = useNavigate()
  const [createTask, { isLoading }] = useCreateTaskMutation()

  return (
    <div className="p-6">
      <TaskForm
        isLoading={isLoading}
        onSubmit={async (data) => {
          await createTask({
            title: data.title,
            description: data.description,
            status: data.status,
            priority: data.priority,
            visibility: data.visibility,
          }).unwrap()

          navigate('/tasks')
        }}
      />
    </div>
  )
}
