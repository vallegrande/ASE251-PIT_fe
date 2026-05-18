/** Estados de monitoreo del backend */
export type EstadoMonitoreo = 'PENDIENTE' | 'COMPLETADO' | 'CANCELADO';

/** Interfaz de Monitoreo que coincide con el modelo del backend */
export interface Monitoreo {
  id: number;
  fechaMonitoreo: string;
  temperatura: number | null;
  humedad: number | null;
  precipitacion: number | null;
  velocidadViento: number | null;
  observaciones: string | null;
  estado: EstadoMonitoreo;
  parcela: {
    id: number;
    nombre: string;
    ubicacion: string;
  };
}

/** Interfaz para crear un nuevo monitoreo */
export interface MonitoreoRequest {
  fechaMonitoreo: string | null;
  temperatura: number | null;
  humedad: number | null;
  precipitacion: number | null;
  velocidadViento: number | null;
  observaciones: string | null;
  estado: EstadoMonitoreo;
  parcela: { id: number };
}
