import { Component, Input } from '@angular/core';
import { DashboardSummary } from '../../interfaces/dashboard.interface';

@Component({
  selector: 'app-dashboard-metrics',
  templateUrl: './dashboard-metrics.component.html',
  styleUrl: './dashboard-metrics.component.css',
  standalone: false
})
export class DashboardMetricsComponent {
  @Input({ required: true }) summary: DashboardSummary | null = null;
}
