import { Navigate } from 'react-router-dom'

import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import TasksPage from '../pages/TasksPage'
import TaskDetailPage from '../pages/TaskDetailsPage'
import CreateTaskPage from '../pages/CreateTaskPage'
import EditTaskPage from '../pages/EditTaskPage'

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
]
