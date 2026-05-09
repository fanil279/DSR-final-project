import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { RootState } from '../app/store'
import { BASE_URL } from '../services/api'

import type {
  AuthResponse,
  Task,
  TasksResponse,
  TaskPriority,
  TaskStatus,
  TaskVisibility,
} from '../types'

export const tasksApi = createApi({
  reducerPath: 'tasksApi',

  tagTypes: ['Tasks'],

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,

    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),

  endpoints: (builder) => ({
    register: builder.mutation<
      AuthResponse,
      {
        nickname: string
        email: string
        password: string
      }
    >({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),

    login: builder.mutation<
      AuthResponse,
      {
        nickname: string
        password: string
      }
    >({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),

    getTasks: builder.query<TasksResponse, void>({
      query: () => '/tasks',

      providesTags: ['Tasks'],
    }),

    getTask: builder.query<Task, string>({
      query: (id) => `/tasks/${id}`,
    }),

    createTask: builder.mutation<
      Task,
      {
        title: string
        description: string
        status: TaskStatus
        priority: TaskPriority
        visibility: TaskVisibility
      }
    >({
      query: (body) => ({
        url: '/tasks',
        method: 'POST',
        body,
      }),

      invalidatesTags: ['Tasks'],
    }),

    updateTask: builder.mutation<
      Task,
      {
        id: string
        title: string
        description: string
        status: TaskStatus
        priority: TaskPriority
        visibility: TaskVisibility
      }
    >({
      query: ({ id, ...body }) => ({
        url: `/tasks/${id}`,
        method: 'PUT',
        body,
      }),

      invalidatesTags: ['Tasks'],
    }),

    deleteTask: builder.mutation<
      { ok: true },
      string
    >({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),

      invalidatesTags: ['Tasks'],
    }),
  }),
})

export const {
  useRegisterMutation,
  useLoginMutation,

  useGetTasksQuery,
  useGetTaskQuery,

  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi
