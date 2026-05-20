import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlertaRequestDTO, AlertaResponseDTO } from '../models/alerta.model';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {
  private readonly API_URL = '/api/alertas';

  constructor(private http: HttpClient) {}

  getAll(estado?: string, deleted?: boolean): Observable<AlertaResponseDTO[]> {
    let params = new HttpParams();
    if (estado) {
      params = params.set('estado', estado);
    }
    if (deleted !== undefined) {
      params = params.set('deleted', deleted.toString());
    }
    return this.http.get<AlertaResponseDTO[]>(this.API_URL, { params });
  }

  getById(id: number): Observable<AlertaResponseDTO> {
    return this.http.get<AlertaResponseDTO>(`${this.API_URL}/${id}`);
  }

  getByParcela(parcelaId: number): Observable<AlertaResponseDTO[]> {
    return this.http.get<AlertaResponseDTO[]>(`${this.API_URL}/parcela/${parcelaId}`);
  }

  create(alerta: AlertaRequestDTO): Observable<AlertaResponseDTO> {
    return this.http.post<AlertaResponseDTO>(this.API_URL, alerta);
  }

  atender(id: number): Observable<void> {
    return this.http.patch<void>(`${this.API_URL}/${id}/atender`, {});
  }

  descartar(id: number): Observable<void> {
    return this.http.patch<void>(`${this.API_URL}/${id}/descartar`, {});
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  restore(id: number): Observable<void> {
    return this.http.patch<void>(`${this.API_URL}/${id}/restaurar`, {});
  }
}
