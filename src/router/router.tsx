import { createBrowserRouter } from 'react-router-dom'

import Layout from '../components/Layout'
import ProtectedRoute from '../components/ProtectedRoute'

import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import TasksPage from '../pages/TasksPage'
import TaskDetailsPage from '../pages/TaskDetailsPage'
import CreateTaskPage from '../pages/CreateTaskPage'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },

  {
    path: '/register',
    element: <RegisterPage />,
  },

  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),

    children: [
      {
        path: '/tasks',
        element: <TasksPage />,
      },

      {
        path: '/tasks/create',
        element: <CreateTaskPage />,
      },

      {
        path: '/tasks/:id',
        element: <TaskDetailsPage />,
      },
    ],
  },
])
