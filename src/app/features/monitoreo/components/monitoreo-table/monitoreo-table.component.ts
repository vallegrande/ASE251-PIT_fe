import { Component, Input } from '@angular/core';
import { Monitoreo } from '../../interfaces/monitoreo.interface';

/**
 * Tabla de historial de monitoreos con indicadores de color.
 */
@Component({
  selector: 'app-monitoreo-table',
  templateUrl: './monitoreo-table.component.html',
  styleUrl: './monitoreo-table.component.css',
  standalone: false
})
export class MonitoreoTableComponent {
  @Input({ required: true }) monitoreos: Monitoreo[] = [];

  formatDate(fecha: string): string {
    if (!fecha) return '-';
    return new Date(fecha).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  /** Indica si la temperatura está fuera de rango óptimo para camote (20-30°C) */
  isTempWarning(temp: number | null): boolean {
    if (temp === null) return false;
    return temp < 18 || temp > 32;
  }

  /** Indica si la humedad está fuera de rango (40-80%) */
  isHumedadWarning(humedad: number | null): boolean {
    if (humedad === null) return false;
    return humedad < 40 || humedad > 85;
  }
}
