import { Component, OnInit } from '@angular/core';
import { DashboardSummary } from '../../interfaces/dashboard.interface';
import { DashboardService } from '../../services/dashboard.service';
import { Alerta } from '../../../alertas/interfaces/alerta.interface';
import { AlertasService } from '../../../alertas/services/alertas.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css',
  standalone: false
})
export class DashboardPageComponent implements OnInit {
  summary: DashboardSummary | null = null;
  alertas: Alerta[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly alertasService: AlertasService
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.loadSummary();
    this.loadAlertas();
  }

  loadSummary(): void {
    this.loading = true;
    this.error = null;
    this.dashboardService.getSummary().subscribe({
      next: (response) => {
        this.summary = response;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el resumen del dashboard.';
        this.loading = false;
      }
    });
  }

  loadAlertas(): void {
    this.alertasService.list().subscribe({
      next: (data) => this.alertas = data,
      error: () => this.alertas = []
    });
  }
}
