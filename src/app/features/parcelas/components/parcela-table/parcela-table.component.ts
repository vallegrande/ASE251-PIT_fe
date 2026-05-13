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

  constructor(private readonly parcelasService: ParcelasService) {}

  getEstadoLabel(estado: Parcela['estado']): string {
    return this.parcelasService.estadoLabel(estado);
  }
}
