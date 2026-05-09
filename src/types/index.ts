export type UserRole =
  | 'USER'
  | 'ADMIN'

export type TaskStatus =
  | 'TODO'
  | 'IN_PROGRESS'
  | 'DONE'

export type TaskPriority =
  | 'LOW'
  | 'MEDIUM'
  | 'HIGH'

export type TaskVisibility =
  | 'ONLY_ME'
  | 'PUBLIC'

export type AssignmentStatus =
  | 'NONE'
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED'

export interface User {
  id: string
  nickname: string
  email: string
  role?: UserRole
}

export interface Tag {
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

  creator: User

  assignee?: User

  assignmentStatus: AssignmentStatus

  assignedById?: string

  viewerUserIds: string[]

  tags: Tag[]

  createdAt: string

  updatedAt: string
}

export interface TasksResponse {
  items: Task[]

  total: number

  page: number

  pageSize: number
}

export interface AuthResponse {
  accessToken: string

  user: User
}
