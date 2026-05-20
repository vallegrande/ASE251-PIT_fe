import { TipoAlerta, NivelAlerta, EstadoAlerta } from './enums';

export interface AlertaRequestDTO {
  parcelaId: number;
  tipo: TipoAlerta | string;
  nivel: NivelAlerta | string;
  descripcion: string;
}

export interface AlertaResponseDTO {
  id: number;
  parcelaId: number;
  parcelaNombre: string;
  tipo: TipoAlerta | string;
  nivel: NivelAlerta | string;
  descripcion: string;
  estado: EstadoAlerta | string;
  fechaAlerta: string;
  fechaAtencion: string | null;
}
