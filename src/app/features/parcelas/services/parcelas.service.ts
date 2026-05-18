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

  list(filtros?: { nombre?: string; estado?: EstadoParcela }): Observable<Parcela[]> {
    let params = new HttpParams();
    if (filtros?.nombre) params = params.set('nombre', filtros.nombre);
    if (filtros?.estado) params = params.set('estado', filtros.estado);
    return this.http.get<Parcela[]>(this.api.endpoint('parcelas'), { params });
  }

  getById(id: number): Observable<Parcela> {
    return this.http.get<Parcela>(this.api.endpoint(`parcelas/${id}`));
  }

  create(payload: ParcelaRequest): Observable<Parcela> {
    return this.http.post<Parcela>(this.api.endpoint('parcelas'), payload);
  }

  update(id: number, payload: ParcelaRequest): Observable<Parcela> {
    return this.http.put<Parcela>(this.api.endpoint(`parcelas/${id}`), payload);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(this.api.endpoint(`parcelas/${id}`));
  }

  estadoLabel(estado: EstadoParcela): string {
    switch (estado) {
      case 'ACTIVO': return 'Activo';
      case 'EN_RIESGO': return 'En riesgo';
      case 'INACTIVO': return 'Inactivo';
      default: return estado;
    }
  }
}
