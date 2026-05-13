import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Alerta, AlertaRequest } from '../interfaces/alerta.interface';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {
  constructor(
    private readonly http: HttpClient,
    private readonly api: ApiService
  ) {}

  list(estado = ''): Observable<Alerta[]> {
    let params = new HttpParams();
    if (estado.trim()) {
      params = params.set('estado', estado);
    }
    return this.http.get<Alerta[]>(this.api.endpoint('alertas'), { params });
  }

  create(payload: AlertaRequest): Observable<Alerta> {
    return this.http.post<Alerta>(this.api.endpoint('alertas'), payload);
  }

  atender(id: number): Observable<Alerta> {
    return this.http.patch<Alerta>(this.api.endpoint(`alertas/${id}/atender`), {});
  }

  descartar(id: number): Observable<Alerta> {
    return this.http.patch<Alerta>(this.api.endpoint(`alertas/${id}/descartar`), {});
  }
}
