import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Alerta } from '../../../alertas/interfaces/alerta.interface';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-charts',
  templateUrl: './dashboard-charts.component.html',
  styleUrl: './dashboard-charts.component.css',
  standalone: false
})
export class DashboardChartsComponent implements AfterViewInit, OnChanges {
  @Input() alertas: Alerta[] = [];

  @ViewChild('alertChart') alertChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('estadoChart') estadoChartRef!: ElementRef<HTMLCanvasElement>;

  private alertChart: Chart | null = null;
  private estadoChart: Chart | null = null;
  private viewReady = false;

  ngAfterViewInit(): void {
    this.viewReady = true;
    setTimeout(() => {
      this.renderAlertChart();
      this.renderEstadoChart();
    }, 100);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.viewReady && changes['alertas']) {
      this.renderAlertChart();
      this.renderEstadoChart();
    }
  }

  private renderAlertChart(): void {
    if (!this.alertChartRef) return;

    const niveles = { BAJA: 0, MEDIA: 0, ALTA: 0, CRITICA: 0 };
    this.alertas.forEach(a => {
      const nivel = a.nivelRiesgo as keyof typeof niveles;
      if (nivel in niveles) niveles[nivel]++;
    });

    if (this.alertChart) this.alertChart.destroy();

    this.alertChart = new Chart(this.alertChartRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Baja', 'Media', 'Alta', 'Crítica'],
        datasets: [{
          data: [niveles.BAJA, niveles.MEDIA, niveles.ALTA, niveles.CRITICA],
          backgroundColor: ['#34d399', '#fbbf24', '#f97316', '#ef4444'],
          borderWidth: 0,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { padding: 16, usePointStyle: true, pointStyleWidth: 10, font: { family: 'Inter', size: 12 } }
          }
        },
        cutout: '65%'
      }
    });
  }

  private renderEstadoChart(): void {
    if (!this.estadoChartRef) return;

    const estados = { PENDIENTE: 0, ATENDIDA: 0, DESCARTADA: 0 };
    this.alertas.forEach(a => {
      const estado = a.estado as keyof typeof estados;
      if (estado in estados) estados[estado]++;
    });

    if (this.estadoChart) this.estadoChart.destroy();

    this.estadoChart = new Chart(this.estadoChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Pendiente', 'Atendida', 'Descartada'],
        datasets: [{
          label: 'Alertas por estado',
          data: [estados.PENDIENTE, estados.ATENDIDA, estados.DESCARTADA],
          backgroundColor: ['#fbbf24', '#34d399', '#94a3b8'],
          borderRadius: 6,
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { family: 'Inter', size: 11 } } },
          x: { grid: { display: false }, ticks: { font: { family: 'Inter', size: 11 } } }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }
}
