import { Component, Input } from '@angular/core';
import { DashboardSummary } from '../../interfaces/dashboard.interface';

/**
 * Métricas del dashboard con tarjetas estadísticas premium.
 */
@Component({
  selector: 'app-dashboard-metrics',
  templateUrl: './dashboard-metrics.component.html',
  styleUrl: './dashboard-metrics.component.css',
  standalone: false
})
export class DashboardMetricsComponent {
  @Input({ required: true }) summary: DashboardSummary | null = null;
}
