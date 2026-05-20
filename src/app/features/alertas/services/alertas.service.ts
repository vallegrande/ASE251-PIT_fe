import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
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

  list(estado = '', deleted = false, parcelaId?: number): Observable<Alerta[]> {
    // Si hay filtro por parcela, usar el endpoint dedicado
    if (parcelaId) {
      return this.http.get<Alerta[]>(
        this.api.endpoint(`alertas/parcela/${parcelaId}`)
      ).pipe(
        // El backend devuelve 404 si la parcela no tiene alertas — tratar como lista vacía
        catchError(err => {
          if (err?.status === 404) return of([]);
          throw err;
        })
      );
    }

    let params = new HttpParams();
    if (deleted) {
      params = params.set('deleted', 'true');
    } else if (estado.trim()) {
      params = params.set('estado', estado);
    }
    return this.http.get<Alerta[]>(this.api.endpoint('alertas'), { params });
  }

  create(payload: AlertaRequest): Observable<Alerta> {
    return this.http.post<Alerta>(this.api.endpoint('alertas'), payload);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(this.api.endpoint(`alertas/${id}`));
  }

  restore(id: number): Observable<void> {
    return this.http.patch<void>(this.api.endpoint(`alertas/${id}/restaurar`), {});
  }

  atender(id: number): Observable<Alerta> {
    return this.http.patch<Alerta>(this.api.endpoint(`alertas/${id}/atender`), null);
  }

  descartar(id: number): Observable<Alerta> {
    return this.http.patch<Alerta>(this.api.endpoint(`alertas/${id}/descartar`), null);
  }
}
