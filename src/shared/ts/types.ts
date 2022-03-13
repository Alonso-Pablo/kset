export interface LogInCredentials {
  csrfToken?: string;
  email: string;
  password: string;
}

export interface SignUpCredentials extends LogInCredentials {
  name: string;
  confirmPassword: string;
}

interface Errors {
  name: string | null;
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
}

export interface MessageResponse {
  errors: Errors;
  success: string | null;
}

export interface AuthResponse {
  message : MessageResponse
}

export interface CreateUserCredentials {
  name: string;
  email: string;
  password: string;
  date: Date;
}
