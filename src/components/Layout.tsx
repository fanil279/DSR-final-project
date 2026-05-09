import { Link, Outlet, useNavigate } from 'react-router-dom'

export default function Layout() {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')

    navigate('/login')
  }

  return (
    <div className="min-h-screen">
      <header className="bg-black text-white p-4 flex items-center justify-between">
        <Link to="/tasks" className="text-2xl font-bold">
          Task Board
        </Link>

        <div className="flex gap-4">
          <Link
            to="/tasks/create"
            className="bg-blue-500 px-4 py-2 rounded"
          >
            Create Task
          </Link>

          <button
            onClick={logout}
            className="bg-red-500 px-4 py-2 rounded cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}
