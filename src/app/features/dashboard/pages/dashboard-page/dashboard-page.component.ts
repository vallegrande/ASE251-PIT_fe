import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardSummary } from '../../interfaces/dashboard.interface';
import { DashboardService } from '../../services/dashboard.service';
import { AlertasService } from '../../../alertas/services/alertas.service';
import { HttpErrorService } from '../../../../core/services/http-error.service';
import { Alerta } from '../../../alertas/interfaces/alerta.interface';
import { Subject } from 'rxjs';
import { takeUntil, timeout } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css',
  standalone: false
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  summary: DashboardSummary | null = null;
  alertas: Alerta[] = [];
  loading = true;
  error: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly alertasService: AlertasService,
    private readonly httpErrorService: HttpErrorService
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.loadSummary();
    this.loadAlertas();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadSummary(): void {
    this.loading = true;
    this.error = null;
    this.summary = null;

    this.dashboardService.getSummary()
      .pipe(
        timeout(5000),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response) => {
          this.summary = response;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading dashboard:', err);
          if (err?.name === 'TimeoutError') {
            this.error = 'El servidor tardó demasiado en responder. Verifica que el backend esté activo.';
          } else if (err?.status === 0) {
            this.error = 'No se pudo conectar con el servidor. Verifica que el backend esté corriendo.';
          } else {
            this.error = 'No se pudo cargar el resumen del dashboard.';
          }
          this.loading = false;
        }
      });
  }

  loadAlertas(): void {
    this.alertasService.list().subscribe({
      next: (data: Alerta[]) => this.alertas = data,
      error: () => this.alertas = []
    });
  }
}
