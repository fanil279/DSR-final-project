import { useNavigate } from 'react-router-dom'

import TaskForm from '../components/TaskForm'
import { useCreateTaskMutation } from '../features/tasksApi'

export default function CreateTaskPage() {
  const navigate = useNavigate()

  const [createTask, { isLoading }] =
    useCreateTaskMutation()

  return (
    <div className="p-6">
      <TaskForm
        isLoading={isLoading}
        onSubmit={async (data) => {
          await createTask(data).unwrap()

          navigate('/tasks')
        }}
      />
    </div>
  )
}
