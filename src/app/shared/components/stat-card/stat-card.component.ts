import { Component, Input } from '@angular/core';

/**
 * Tarjeta estadística reutilizable con diseño premium.
 * Muestra un ícono, etiqueta, valor y hint con tonos de color.
 */
@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.css',
  standalone: false
})
export class StatCardComponent {
  @Input({ required: true }) label = '';
  @Input({ required: true }) value: string | number = '-';
  @Input() hint = '';
  @Input() icon = 'bi-bar-chart';
  @Input() tone: 'default' | 'danger' | 'success' | 'warning' | 'info' = 'default';
}
