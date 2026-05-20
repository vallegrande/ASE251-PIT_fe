export enum EstadoParcela {
  ACTIVO = 'ACTIVO',
  EN_RIESGO = 'EN_RIESGO',
  INACTIVO = 'INACTIVO'
}

export enum TipoAlerta {
  PLAGA = 'PLAGA',
  SEQUIA = 'SEQUIA',
  LLUVIA_INTENSA = 'LLUVIA_INTENSA',
  TEMPERATURA = 'TEMPERATURA',
  OTRO = 'OTRO'
}

export enum NivelAlerta {
  BAJA = 'BAJA',
  MEDIA = 'MEDIA',
  ALTA = 'ALTA',
  CRITICA = 'CRITICA'
}

export enum EstadoAlerta {
  PENDIENTE = 'PENDIENTE',
  ATENDIDA = 'ATENDIDA',
  DESCARTADA = 'DESCARTADA'
}
