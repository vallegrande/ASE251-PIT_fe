import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Alerta, AlertaRequest, EstadoAlerta } from '../interfaces/alerta.interface';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {
  constructor(
    private readonly http: HttpClient,
    private readonly api: ApiService
  ) {}

  list(estado?: EstadoAlerta): Observable<Alerta[]> {
    const params = estado ? new HttpParams().set('estado', estado) : {};
    return this.http.get<Alerta[]>(this.api.endpoint('alertas'), { params });
  }

  getById(id: number): Observable<Alerta> {
    return this.http.get<Alerta>(this.api.endpoint(`alertas/${id}`));
  }

  listByParcela(parcelaId: number): Observable<Alerta[]> {
    return this.http.get<Alerta[]>(this.api.endpoint(`alertas/parcela/${parcelaId}`));
  }

  create(payload: AlertaRequest): Observable<Alerta> {
    return this.http.post<Alerta>(this.api.endpoint('alertas'), payload);
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
