export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  nombreCompleto: string;
  telefono?: string | null;
  direccion?: string | null;
  rol?: RolUsuario | null;
  estado?: EstadoUsuario | null;
  mensaje?: string;
}

export type RolUsuario = 'ADMINISTRATIVO' | 'AGRICULTOR' | 'ESPECIALISTA';
export type EstadoUsuario = 'ACTIVO' | 'INACTIVO' | 'BLOQUEADO';

export interface Usuario {
  id?: number;
  username: string;
  password?: string;
  email: string;
  nombreCompleto: string;
  telefono?: string;
  direccion?: string;
  rol: RolUsuario;
  estado: EstadoUsuario;
}

export type UsuarioRol = RolUsuario;
export type UsuarioEstado = EstadoUsuario;

export interface RegisterRequest {
  nombreCompleto: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  telefono: string;
  direccion: string;
  areaTrabajo: string;
}

export interface RegisterResponse {
  id: number;
  username: string;
  email: string;
  nombreCompleto: string;
  fechaRegistro: string;
  mensaje: string;
}

export interface UsuarioApi {
  id: number;
  username: string;
  password?: string;
  email: string;
  nombreCompleto: string;
  telefono?: string | null;
  direccion?: string | null;
  fechaRegistro?: string | null;
  rol?: RolUsuario | null;
  estado?: EstadoUsuario | null;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  nombreCompleto: string;
  telefono: string | null;
  direccion: string | null;
  fechaRegistro: string | null;
  rol: RolUsuario | null;
  estado: EstadoUsuario | null;
}
