import { Parcela } from '../../parcelas/interfaces/parcela.interface';

export type TipoAlerta = 'PLAGA' | 'SEQUIA' | 'LLUVIA_INTENSA' | 'CALOR_EXCESIVO' | 'HUMEDAD_BAJA' | 'ENFERMEDAD' | 'OTRO';
export type NivelRiesgo = 'BAJA' | 'MEDIA' | 'ALTA' | 'CRITICA';
export type EstadoAlerta = 'PENDIENTE' | 'ATENDIDA' | 'DESCARTADA';

export interface Alerta {
  id?: number;
  tipo: TipoAlerta;
  mensaje: string; // ANTES: descripcion
  nivelRiesgo: NivelRiesgo; // ANTES: nivel
  fecha?: string; // ANTES: fecha_alerta
  estado: EstadoAlerta;
  parcela: Parcela;
}

export interface AlertaRequest {
  parcela: { id: number };
  tipo: TipoAlerta;
  nivelRiesgo: NivelRiesgo;
  mensaje: string;
}

