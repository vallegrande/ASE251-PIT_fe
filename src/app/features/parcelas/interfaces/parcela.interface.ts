export type EstadoParcela = 'ACTIVO' | 'EN_RIESGO' | 'INACTIVO';

export interface Parcela {
  id: number;
  nombre: string;
  area: number;
  ubicacion: string;
  estado: EstadoParcela;
  humedad?: number;
  temperatura?: number;
  fechaSiembra?: string;
  fechaCosechaEstimada?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ParcelaRequest {
  nombre: string;
  area: number;
  ubicacion: string;
  estado: EstadoParcela;
  humedad?: number;
  temperatura?: number;
  fechaSiembra?: string;
  fechaCosechaEstimada?: string;
}

