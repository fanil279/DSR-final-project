import { jwtDecode } from 'jwt-decode'

export interface JwtPayload {
  sub: string
  nickname?: string
  email?: string
}

export function getUserFromToken(token: string | null): JwtPayload | null {
  if (!token) return null

  try {
    return jwtDecode<JwtPayload>(token)
  } catch {
    return null
  }
}
