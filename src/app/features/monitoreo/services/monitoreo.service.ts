import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Monitoreo, MonitoreoRequest } from '../interfaces/monitoreo.interface';

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

  /** Obtener monitoreos de una parcela */
  listByParcela(parcelaId: number): Observable<Monitoreo[]> {
    return this.http.get<Monitoreo[]>(this.api.endpoint(`monitoreos/parcela/${parcelaId}`));
  }

  /** Obtener último monitoreo de una parcela */
  getUltimo(parcelaId: number): Observable<Monitoreo> {
    return this.http.get<Monitoreo>(this.api.endpoint(`monitoreos/parcela/${parcelaId}/ultimo`));
  }

  /** Crear nuevo monitoreo */
  create(payload: MonitoreoRequest): Observable<Monitoreo> {
    return this.http.post<Monitoreo>(this.api.endpoint('monitoreos'), payload);
  }
}
