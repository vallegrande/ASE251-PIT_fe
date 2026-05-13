export type TipoAlerta = 'PLAGA' | 'SEQUIA' | 'LLUVIA_INTENSA' | 'TEMPERATURA' | 'OTRO';
export type NivelAlerta = 'BAJA' | 'MEDIA' | 'ALTA' | 'CRITICA';
export type EstadoAlerta = 'PENDIENTE' | 'ATENDIDA' | 'DESCARTADA';

export interface Alerta {
  id: number;
  parcelaId: number;
  parcelaNombre: string;
  tipo: TipoAlerta;
  nivel: NivelAlerta;
  descripcion: string;
  estado: EstadoAlerta;
  fechaAlerta: string;
  fechaAtencion: string | null;
}

export interface AlertaRequest {
  parcelaId: number;
  tipo: TipoAlerta;
  nivel: NivelAlerta;
  descripcion: string;
}
