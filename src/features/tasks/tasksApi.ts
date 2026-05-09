import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../../app/store'
import { BASE_URL } from '../../services/api'

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE'
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH'
export type TaskVisibility = 'ONLY_ME' | 'PUBLIC'
export type TaskSort = 'newest' | 'oldest'

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  visibility: TaskVisibility
  viewerUserIds: string[]
}

export interface TasksResponse {
  items: Task[]
  total: number
  page: number
}

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

    getTasks: builder.query<
      TasksResponse,
      {
        page?: number
        pageSize?: number
        status?: TaskStatus[]
        priority?: TaskPriority[]
        assignmentStatus?: string
        q?: string
        tag?: string[]
        sort?: 'createdAt' | 'updatedAt' | 'title'
        order?: 'asc' | 'desc'
        mine?: 'all' | 'created' | 'assigned' | 'involved'
      }
    >({
      query: (params) => ({
        url: '/tasks',
        params,
      }),
      providesTags: ['Tasks'],
    }),

    getTask: builder.query<Task, string>({
      query: (id) => `/tasks/${id}`,
    }),

    createTask: builder.mutation<Task, Omit<Task, 'id' | 'viewerUserIds'>>({
      query: (body) => ({
        url: '/tasks',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Tasks'],
    }),

    updateTask: builder.mutation<Task, Partial<Task> & { id: string }>({
      query: ({ id, ...body }) => ({
        url: `/tasks/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Tasks'],
    }),

    deleteTask: builder.mutation<{ ok: true }, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks'],
    }),
  }),
})

export const {
  useGetTasksQuery,
  useGetTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi
