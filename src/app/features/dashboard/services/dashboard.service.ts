import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    return this.http.get<Record<string, unknown>>(this.api.endpoint('dashboard/resumen')).pipe(
      map((raw) => ({
        totalParcelas: this.num(raw, ['totalParcelas', 'parcelasTotales']),
        parcelasActivas: this.num(raw, ['parcelasActivas']),
        parcelasEnRiesgo: this.num(raw, ['parcelasEnRiesgo', 'parcelasBajoMantenimiento']),
        areaTotalHectareas: this.num(raw, ['areaTotalHectareas', 'areaTotal']),
        alertasPendientes: this.num(raw, ['alertasPendientes']),
        alertasCriticas: this.num(raw, ['alertasCriticas'])
      }))
    );
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

  private num(source: Record<string, unknown>, keys: string[]): number {
    for (const key of keys) {
      const value = source[key];
      if (typeof value === 'number') {
        return value;
      }
      if (typeof value === 'string') {
        const parsed = Number(value);
        if (!Number.isNaN(parsed)) {
          return parsed;
        }
      }
    }
    return 0;
  }
}
