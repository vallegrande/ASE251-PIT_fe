import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Monitoreo, MonitoreoRequest } from '../interfaces/monitoreo.interface';
import { toIsoLocalDateTime } from '../../../core/utils/date-time.util';

/**
 * Servicio de Monitoreo.
 * Comunicación con el backend para registros de monitoreo ambiental.
 */
@Injectable({
  providedIn: 'root'
})
export class MonitoreoService {
  constructor(
    private readonly http: HttpClient,
    private readonly api: ApiService
  ) {}

  /** Obtener todos los monitoreos */
  list(): Observable<Monitoreo[]> {
    return this.http.get<Monitoreo[]>(this.api.endpoint('monitoreos'));
  }

  getById(id: number): Observable<Monitoreo> {
    return this.http.get<Monitoreo>(this.api.endpoint(`monitoreos/${id}`));
  }

  /** Obtener monitoreos de una parcela */
  listByParcela(parcelaId: number): Observable<Monitoreo[]> {
    return this.http.get<Monitoreo[]>(this.api.endpoint(`monitoreos/parcela/${parcelaId}`));
  }

  /** Obtener último monitoreo de una parcela */
  getUltimo(parcelaId: number): Observable<Monitoreo> {
    return this.http.get<Monitoreo>(this.api.endpoint(`monitoreos/parcela/${parcelaId}/ultimo`));
  }

  listCompletadosByParcela(parcelaId: number): Observable<Monitoreo[]> {
    return this.http.get<Monitoreo[]>(this.api.endpoint(`monitoreos/parcela/${parcelaId}/completados`));
  }

  listByRango(parcelaId: number, fechaInicio: string | null, fechaFin: string | null): Observable<Monitoreo[]> {
    let params = new HttpParams();
    const inicio = toIsoLocalDateTime(fechaInicio);
    const fin = toIsoLocalDateTime(fechaFin);

    if (inicio) params = params.set('fechaInicio', inicio);
    if (fin) params = params.set('fechaFin', fin);

    return this.http.get<Monitoreo[]>(this.api.endpoint(`monitoreos/parcela/${parcelaId}/rango`), { params });
  }

  countByParcela(parcelaId: number): Observable<number> {
    return this.http.get<number>(this.api.endpoint(`monitoreos/parcela/${parcelaId}/contar`));
  }

  /** Crear nuevo monitoreo */
  create(payload: MonitoreoRequest): Observable<Monitoreo> {
    const body = {
      ...payload,
      fechaMonitoreo: toIsoLocalDateTime(payload.fechaMonitoreo) ?? new Date().toISOString()
    };
    return this.http.post<Monitoreo>(this.api.endpoint('monitoreos'), body);
  }

  update(id: number, payload: MonitoreoRequest): Observable<Monitoreo> {
    const body = {
      ...payload,
      fechaMonitoreo: toIsoLocalDateTime(payload.fechaMonitoreo) ?? new Date().toISOString()
    };
    return this.http.put<Monitoreo>(this.api.endpoint(`monitoreos/${id}`), body);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(this.api.endpoint(`monitoreos/${id}`));
  }
}
