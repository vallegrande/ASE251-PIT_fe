import { Component, OnInit } from '@angular/core';
import { DashboardSummary } from '../../interfaces/dashboard.interface';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css',
  standalone: false
})
export class DashboardPageComponent implements OnInit {
  summary: DashboardSummary | null = null;
  loading = true;
  error: string | null = null;

  constructor(private readonly dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadSummary();
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
}
