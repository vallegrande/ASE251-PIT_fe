import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Alerta, AlertaRequest, NivelRiesgo } from '../interfaces/alerta.interface';
import { toIsoLocalDateTime } from '../../../core/utils/date-time.util';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {
  constructor(
    private readonly http: HttpClient,
    private readonly api: ApiService
  ) {}

  list(): Observable<Alerta[]> {
    return this.http.get<Alerta[]>(this.api.endpoint('alertas'));
  }

  getById(id: number): Observable<Alerta> {
    return this.http.get<Alerta>(this.api.endpoint(`alertas/${id}`));
  }

  listByParcela(parcelaId: number): Observable<Alerta[]> {
    return this.http.get<Alerta[]>(this.api.endpoint(`alertas/parcela/${parcelaId}`));
  }

  listPendientesByParcela(parcelaId: number): Observable<Alerta[]> {
    return this.http.get<Alerta[]>(this.api.endpoint(`alertas/parcela/${parcelaId}/pendientes`));
  }

  listCriticasByParcela(parcelaId: number): Observable<Alerta[]> {
    return this.http.get<Alerta[]>(this.api.endpoint(`alertas/parcela/${parcelaId}/criticas`));
  }

  countGravesByParcela(parcelaId: number): Observable<number> {
    return this.http.get<number>(this.api.endpoint(`alertas/parcela/${parcelaId}/graves`));
  }

  listByNivel(nivel: NivelRiesgo): Observable<Alerta[]> {
    return this.http.get<Alerta[]>(this.api.endpoint(`alertas/nivel/${nivel}`));
  }

  listByRango(fechaInicio: string | null, fechaFin: string | null): Observable<Alerta[]> {
    let params = new HttpParams();
    const inicio = toIsoLocalDateTime(fechaInicio);
    const fin = toIsoLocalDateTime(fechaFin);

    if (inicio) params = params.set('fechaInicio', inicio);
    if (fin) params = params.set('fechaFin', fin);

    return this.http.get<Alerta[]>(this.api.endpoint('alertas/rango'), { params });
  }

  create(payload: AlertaRequest): Observable<Alerta> {
    return this.http.post<Alerta>(this.api.endpoint('alertas'), payload);
  }

  update(id: number, payload: Alerta): Observable<Alerta> {
    return this.http.put<Alerta>(this.api.endpoint(`alertas/${id}`), payload);
  }

  atender(id: number): Observable<Alerta> {
    return this.http.patch<Alerta>(this.api.endpoint(`alertas/${id}/atender`), null);
  }

  descartar(id: number): Observable<Alerta> {
    return this.http.patch<Alerta>(this.api.endpoint(`alertas/${id}/descartar`), null);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(this.api.endpoint(`alertas/${id}`));
  }
}
