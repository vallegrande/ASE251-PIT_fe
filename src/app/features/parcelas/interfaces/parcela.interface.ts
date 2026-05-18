import { Usuario } from '../../auth/interfaces/auth.interface';

export type EstadoParcela = 'ACTIVA' | 'INACTIVA' | 'BAJO_MANTENIMIENTO';

export interface Parcela {
  id?: number;
  nombre: string;
  ubicacion: string;
  area: number; // FLOAT
  tipoSuelo?: string;
  cultivo?: string;
  descripcion?: string;
  estado: EstadoParcela;
  usuario: Usuario;
}

export interface ParcelaRequest {
  nombre: string;
  area: number;
  ubicacion: string;
  tipoSuelo: string | null;
  cultivo: string | null;
  descripcion: string | null;
  estado: EstadoParcela;
  usuario: { id: number } | null;
}

