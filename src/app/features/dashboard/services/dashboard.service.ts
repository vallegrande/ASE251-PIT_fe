import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardSummary } from '../interfaces/dashboard.interface';
import { ApiService } from '../../../core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(
    private readonly http: HttpClient,
    private readonly api: ApiService
  ) {}

  getSummary(): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(this.api.endpoint('dashboard'));
  }

  getHealth(): Observable<Record<string, unknown>> {
    return this.http.get<Record<string, unknown>>(this.api.endpoint('dashboard/health'));
  }

  getParcelaStats(parcelaId: number): Observable<Record<string, unknown>> {
    return this.http.get<Record<string, unknown>>(this.api.endpoint(`dashboard/parcela/${parcelaId}/estadisticas`));
  }

  getUsuarioStats(usuarioId: number): Observable<Record<string, unknown>> {
    return this.http.get<Record<string, unknown>>(this.api.endpoint(`dashboard/usuario/${usuarioId}/estadisticas`));
  }
}
