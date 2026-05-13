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

  nivelLabel(value: Alerta['nivel']): string {
    if (value === 'CRITICA') {
      return 'Crítica';
    }
    if (value === 'ALTA') {
      return 'Alta';
    }
    if (value === 'MEDIA') {
      return 'Media';
    }
    return 'Baja';
  }
}
