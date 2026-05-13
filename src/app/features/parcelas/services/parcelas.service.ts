import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { EstadoParcela, Parcela, ParcelaRequest } from '../interfaces/parcela.interface';

@Injectable({
  providedIn: 'root'
})
export class ParcelasService {
  constructor(
    private readonly http: HttpClient,
    private readonly api: ApiService
  ) {}

  list(nombre = '', estado = ''): Observable<Parcela[]> {
    let params = new HttpParams();
    if (nombre.trim()) {
      params = params.set('nombre', nombre.trim());
    }
    if (estado.trim()) {
      params = params.set('estado', estado);
    }
    return this.http.get<Parcela[]>(this.api.endpoint('parcelas'), { params });
  }

  create(payload: ParcelaRequest): Observable<Parcela> {
    return this.http.post<Parcela>(this.api.endpoint('parcelas'), payload);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(this.api.endpoint(`parcelas/${id}`));
  }

  estadoLabel(estado: EstadoParcela): string {
    if (estado === 'EN_RIESGO') {
      return 'En riesgo';
    }
    if (estado === 'ACTIVO') {
      return 'Activo';
    }
    return 'Inactivo';
  }
}
