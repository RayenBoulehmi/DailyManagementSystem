export interface LoginResponse {
  data?: {
    user: {
      id: number
      username: string
      email: string
      roles: string[]
      accessToken: string
    }
  },
  message?: string
  exception?: string
  status: string
  statusCode: number
  timestamp: string
}
