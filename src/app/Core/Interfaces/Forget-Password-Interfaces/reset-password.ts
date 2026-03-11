export interface ResetPassword {
  userId: string; // snapshot
  token: string; // snapshot
  password: string;
  confirmPassword: string;
}
