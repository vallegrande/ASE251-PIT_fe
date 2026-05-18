import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Parcela } from '../../interfaces/parcela.interface';
import { ParcelasService } from '../../services/parcelas.service';

@Component({
  selector: 'app-parcela-table',
  templateUrl: './parcela-table.component.html',
  styleUrl: './parcela-table.component.css',
  standalone: false
})
export class ParcelaTableComponent {
  @Input({ required: true }) parcelas: Parcela[] = [];
  @Output() deleteParcela = new EventEmitter<number>();
  @Output() editParcela = new EventEmitter<Parcela>();

  constructor(private readonly parcelasService: ParcelasService) {}

  getEstadoLabel(estado: Parcela['estado']): string {
    return this.parcelasService.estadoLabel(estado);
  }

  getEstadoClass(estado: Parcela['estado']): string {
    switch (estado) {
      case 'ACTIVO': return 'badge-success';
      case 'EN_RIESGO': return 'badge-warning';
      case 'INACTIVO': return 'badge-neutral';
      default: return 'badge-neutral';
    }
  }

  formatDate(date: string | null): string {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' });
  }
}
