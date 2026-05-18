export interface LoginRequest {
  correo: string;
  password: string;
}

export interface RegisterRequest {
  nombreCompleto: string;
  correo: string;
  username: string;
  password: string;
  rol: string;
  area: string;
  estado: boolean;
}

export interface AuthUser {
  id: number;
  username: string;
  correo: string;
  nombreCompleto: string;
  rol: string;
  area: string;
  estado: boolean;
}
