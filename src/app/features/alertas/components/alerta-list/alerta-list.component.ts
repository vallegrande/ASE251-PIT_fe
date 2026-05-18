import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Alerta } from '../../interfaces/alerta.interface';

@Component({
  selector: 'app-alerta-list',
  templateUrl: './alerta-list.component.html',
  styleUrl: './alerta-list.component.css',
  standalone: false
})
export class AlertaListComponent {
  @Input({ required: true }) alertas: Alerta[] = [];
  @Output() atender = new EventEmitter<number>();
  @Output() descartar = new EventEmitter<number>();

  getNivelClass(nivel: string): string {
    switch (nivel) {
      case 'CRITICA': return 'nivel-critica';
      case 'ALTA': return 'nivel-alta';
      case 'MEDIA': return 'nivel-media';
      default: return 'nivel-baja';
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

  formatDate(fecha: string | null): string {
    if (!fecha) return '-';
    return new Date(fecha).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }
}
