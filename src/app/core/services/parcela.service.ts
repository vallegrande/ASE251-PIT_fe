import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParcelaRequestDTO, ParcelaResponseDTO } from '../models/parcela.model';

@Injectable({
  providedIn: 'root'
})
export class ParcelaService {
  private readonly API_URL = '/api/parcelas';

  constructor(private http: HttpClient) {}

  getAll(nombre?: string, estado?: string, deleted?: boolean): Observable<ParcelaResponseDTO[]> {
    let params = new HttpParams();
    if (nombre) {
      params = params.set('nombre', nombre);
    }
    if (estado) {
      params = params.set('estado', estado);
    }
    if (deleted !== undefined) {
      params = params.set('deleted', deleted.toString());
    }
    return this.http.get<ParcelaResponseDTO[]>(this.API_URL, { params });
  }

  getById(id: number): Observable<ParcelaResponseDTO> {
    return this.http.get<ParcelaResponseDTO>(`${this.API_URL}/${id}`);
  }

  create(parcela: ParcelaRequestDTO): Observable<ParcelaResponseDTO> {
    return this.http.post<ParcelaResponseDTO>(this.API_URL, parcela);
  }

  update(id: number, parcela: ParcelaRequestDTO): Observable<ParcelaResponseDTO> {
    return this.http.put<ParcelaResponseDTO>(`${this.API_URL}/${id}`, parcela);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  restore(id: number): Observable<void> {
    return this.http.patch<void>(`${this.API_URL}/${id}/restaurar`, {});
  }
}
