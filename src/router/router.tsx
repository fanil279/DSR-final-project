import { Navigate } from 'react-router-dom'

import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import TasksPage from '../pages/tasks/TasksPage'
import TaskDetailPage from '../pages/tasks/TaskDetailsPage'
import CreateTaskPage from '../pages/tasks/CreateTaskPage'
import EditTaskPage from '../pages/tasks/EditTaskPage'
import KanbanPage from './../pages/kanban/KanbanPage'

import ProtectedRoute from '../components/ProtectedRoute'

export const routes = [
  {
    path: '/',
    element: <Navigate to="/tasks" />,
  },

  {
    path: '/login',
    element: <LoginPage />,
  },

  {
    path: '/register',
    element: <RegisterPage />,
  },

  {
    path: '/tasks',
    element: (
      <ProtectedRoute>
        <TasksPage />
      </ProtectedRoute>
    ),
  },

  {
    path: '/tasks/new',
    element: (
      <ProtectedRoute>
        <CreateTaskPage />
      </ProtectedRoute>
    ),
  },

  {
    path: '/tasks/:id',
    element: (
      <ProtectedRoute>
        <TaskDetailPage />
      </ProtectedRoute>
    ),
  },

  {
    path: '/tasks/:id/edit',
    element: (
      <ProtectedRoute>
        <EditTaskPage />
      </ProtectedRoute>
    ),
  },

  {
    path: '/kanban',
    element: (
      <ProtectedRoute>
        <KanbanPage />
      </ProtectedRoute>
    ),
  }
]
