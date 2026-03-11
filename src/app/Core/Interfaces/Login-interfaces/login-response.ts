export interface LoginResponse {
  userId: string;
  userName: string;
  isAuthenticated: boolean;
  roles: string[];
  message: string;
  token: string;
}
