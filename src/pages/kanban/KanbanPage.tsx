import { useGetTasksQuery } from '../../features/tasks/tasksApi'
import { Link } from 'react-router-dom'

const columns = ['TODO', 'IN_PROGRESS', 'DONE'] as const

export default function KanbanPage() {
  const { data, isLoading } = useGetTasksQuery({
    page: 1,
    pageSize: 100,
  })

  if (isLoading) return <p className="p-6">Loading...</p>

  const tasks = data?.items ?? []

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Kanban Board</h1>

      <div className="grid grid-cols-3 gap-4">

        {columns.map((col) => (
          <div key={col} className="bg-gray-100 p-3 rounded min-h-[400px]">
            
            <h2 className="font-bold mb-3">{col}</h2>

            {tasks
              .filter((t) => t.status === col)
              .map((task) => (
                <div
                  key={task.id}
                  className="bg-white p-3 rounded shadow mb-2"
                >
                  <Link to={`/tasks/${task.id}`}>
                    <p className="font-medium">{task.title}</p>
                  </Link>

                  <p className="text-xs text-gray-500">
                    {task.priority}
                  </p>
                </div>
              ))}

          </div>
        ))}

      </div>
    </div>
  )
}
