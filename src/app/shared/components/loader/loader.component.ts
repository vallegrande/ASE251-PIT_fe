import { Component, Input } from '@angular/core';

/**
 * Componente de carga animado reutilizable.
 */
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
  standalone: false
})
export class LoaderComponent {
  @Input() message = 'Cargando...';
}
