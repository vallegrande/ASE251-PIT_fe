import { Component, Input } from '@angular/core';
import { Alerta } from '../../../alertas/interfaces/alerta.interface';

@Component({
  selector: 'app-recent-alerts',
  templateUrl: './recent-alerts.component.html',
  styleUrl: './recent-alerts.component.css',
  standalone: false
})
export class RecentAlertsComponent {
  @Input() alertas: Alerta[] = [];

  get recentAlertas(): Alerta[] {
    return [...this.alertas]
      .sort((a, b) => new Date(b.fechaAlerta ?? '').getTime() - new Date(a.fechaAlerta ?? '').getTime())
      .slice(0, 5);
  }

  getNivelClass(nivel: string): string {
    switch (nivel) {
      case 'CRITICA': return 'badge-danger';
      case 'ALTA': return 'badge-warning';
      case 'MEDIA': return 'badge-info';
      default: return 'badge-success';
    }
  }

  getNivelLabel(nivel: string): string {
    switch (nivel) {
      case 'CRITICA': return 'Crítica';
      case 'ALTA': return 'Alta';
      case 'MEDIA': return 'Media';
      default: return 'Baja';
    }
  }

  formatDate(fecha: string | null | undefined): string {
    if (!fecha) return '-';
    return new Date(fecha).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' });
  }
}
