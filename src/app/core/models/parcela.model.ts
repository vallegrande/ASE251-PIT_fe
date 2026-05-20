import { EstadoParcela } from './enums';

export interface ParcelaRequestDTO {
  nombre: string;
  area?: number;
  ubicacion: string;
  estado?: EstadoParcela | string;
  humedad?: number;
  temperatura?: number;
  fechaSiembra?: string;
  fechaCosechaEstimada?: string;
}

export interface ParcelaResponseDTO {
  id: number;
  nombre: string;
  area: number;
  ubicacion: string;
  estado: EstadoParcela | string;
  humedad: number;
  temperatura: number;
  fechaSiembra: string;
  fechaCosechaEstimada: string;
  createdAt: string;
  updatedAt: string;
}
