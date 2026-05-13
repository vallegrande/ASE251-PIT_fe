export type EstadoParcela = 'ACTIVO' | 'EN_RIESGO' | 'INACTIVO';

export interface Parcela {
  id: number;
  nombre: string;
  area: number;
  ubicacion: string;
  estado: EstadoParcela;
  humedad: number | null;
  temperatura: number | null;
  fechaSiembra: string | null;
  fechaCosechaEstimada: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ParcelaRequest {
  nombre: string;
  area: number;
  ubicacion: string;
  estado: EstadoParcela;
  humedad: number | null;
  temperatura: number | null;
  fechaSiembra: string | null;
  fechaCosechaEstimada: string | null;
}
