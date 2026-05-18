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
    if (filtros?.nombre?.trim()) {
      const params = new HttpParams().set('nombre', filtros.nombre.trim());
      return this.http.get<Parcela[]>(this.api.endpoint('parcelas/buscar'), { params });
    }

    if (filtros?.estado) {
      return this.http.get<Parcela[]>(this.api.endpoint(`parcelas/estado/${filtros.estado}`));
    }

    return this.http.get<Parcela[]>(this.api.endpoint('parcelas'));
  }

  getById(id: number): Observable<Parcela> {
    return this.http.get<Parcela>(this.api.endpoint(`parcelas/${id}`));
  }

  listByUsuario(usuarioId: number): Observable<Parcela[]> {
    return this.http.get<Parcela[]>(this.api.endpoint(`parcelas/usuario/${usuarioId}`));
  }

  countActivasByUsuario(usuarioId: number): Observable<number> {
    return this.http.get<number>(this.api.endpoint(`parcelas/usuario/${usuarioId}/activas`));
  }

  create(payload: ParcelaRequest): Observable<Parcela> {
    return this.http.post<Parcela>(this.api.endpoint('parcelas'), payload);
  }

  update(id: number, payload: ParcelaRequest): Observable<Parcela> {
    return this.http.put<Parcela>(this.api.endpoint(`parcelas/${id}`), payload);
  }

  changeEstado(id: number, estado: EstadoParcela): Observable<Parcela> {
    const params = new HttpParams().set('estado', estado);
    return this.http.patch<Parcela>(this.api.endpoint(`parcelas/${id}/estado`), null, { params });
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(this.api.endpoint(`parcelas/${id}`));
  }

  estadoLabel(estado: EstadoParcela): string {
    switch (estado) {
      case 'ACTIVA': return 'Activa';
      case 'INACTIVA': return 'Inactiva';
      case 'BAJO_MANTENIMIENTO': return 'Bajo mantenimiento';
      default: return estado;
    }
  }
}
