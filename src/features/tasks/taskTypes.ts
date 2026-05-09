import type { User } from '../../types'

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE'

export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH'

export type TaskVisibility = 'ONLY_ME' | 'LIST' | 'ANYONE'

export type TaskSort = 'createdAt' | 'updatedAt' | 'title' | 'priority' | 'status'

export interface TaskTag {
  id: string
  name: string
}

export interface Task {
  id: string
  title: string
  description: string

  status: TaskStatus
  priority: TaskPriority
  visibility: TaskVisibility

  createdAt: string
  updatedAt: string

  creator?: User
  assignee?: User

  assignedTo?: string
  assignedById?: string
  assignmentStatus?: 'NONE' | 'PENDING' | 'APPROVED' | 'REJECTED'

  blockedBy?: string[]

  tags?: TaskTag[]
}

export interface TasksResponse {
  items: Task[]
  total: number
  page: number
  pageSize: number
}
