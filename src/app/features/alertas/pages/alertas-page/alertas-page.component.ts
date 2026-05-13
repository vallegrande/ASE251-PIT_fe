import { Component, OnInit } from '@angular/core';
import { Alerta, AlertaRequest } from '../../interfaces/alerta.interface';
import { AlertasService } from '../../services/alertas.service';
import { Parcela } from '../../../parcelas/interfaces/parcela.interface';
import { ParcelasService } from '../../../parcelas/services/parcelas.service';

@Component({
  selector: 'app-alertas-page',
  templateUrl: './alertas-page.component.html',
  styleUrl: './alertas-page.component.css',
  standalone: false
})
export class AlertasPageComponent implements OnInit {
  alertas: Alerta[] = [];
  parcelas: Parcela[] = [];
  estadoFiltro = '';
  loading = true;
  error: string | null = null;

  readonly estados = ['PENDIENTE', 'ATENDIDA', 'DESCARTADA'];
  readonly tipos = ['PLAGA', 'SEQUIA', 'LLUVIA_INTENSA', 'TEMPERATURA', 'OTRO'];
  readonly niveles = ['BAJA', 'MEDIA', 'ALTA', 'CRITICA'];

  model: AlertaRequest = {
    parcelaId: 0,
    tipo: 'PLAGA',
    nivel: 'MEDIA',
    descripcion: ''
  };

  constructor(
    private readonly alertasService: AlertasService,
    private readonly parcelasService: ParcelasService
  ) {}

  ngOnInit(): void {
    this.load();
    this.loadParcelas();
  }

  load(): void {
    this.loading = true;
    this.error = null;
    this.alertasService.list(this.estadoFiltro).subscribe({
      next: (response) => {
        this.alertas = response;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar la lista de alertas.';
        this.loading = false;
      }
    });
  }

  loadParcelas(): void {
    this.parcelasService.list().subscribe({
      next: (response) => {
        this.parcelas = response;
        if (this.parcelas.length > 0 && this.model.parcelaId === 0) {
          this.model.parcelaId = this.parcelas[0].id;
        }
      }
    });
  }

  create(): void {
    this.alertasService.create(this.model).subscribe({
      next: () => {
        this.model.descripcion = '';
        this.load();
      },
      error: () => {
        this.error = 'No se pudo registrar la alerta.';
      }
    });
  }

  atender(id: number): void {
    this.alertasService.atender(id).subscribe({
      next: () => this.load(),
      error: () => {
        this.error = 'No se pudo atender la alerta.';
      }
    });
  }

  descartar(id: number): void {
    this.alertasService.descartar(id).subscribe({
      next: () => this.load(),
      error: () => {
        this.error = 'No se pudo descartar la alerta.';
      }
    });
  }
}
