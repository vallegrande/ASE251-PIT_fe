import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alerta, AlertaRequest } from '../../interfaces/alerta.interface';
import { AlertasService } from '../../services/alertas.service';
import { Parcela } from '../../../parcelas/interfaces/parcela.interface';
import { ParcelasService } from '../../../parcelas/services/parcelas.service';
import Swal from 'sweetalert2';
import { HttpErrorService } from '../../../../core/services/http-error.service';
import { ToastService } from '../../../../shared/components/toast/toast.service';

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
  parcelaIdFiltro: number | undefined;
  isTrashMode = false;
  loading = true;
  error: string | null = null;
  showForm = false;

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
    private readonly parcelasService: ParcelasService,
    private readonly httpErrorService: HttpErrorService,
    private readonly route: ActivatedRoute,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['parcelaId']) {
        this.parcelaIdFiltro = Number(params['parcelaId']);
      }
      this.load();
    });
    this.loadParcelas();
  }

  toggleTrashMode(): void {
    this.isTrashMode = !this.isTrashMode;
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = null;
    this.alertasService.list(this.estadoFiltro, this.isTrashMode, this.parcelaIdFiltro).subscribe({
      next: (response) => {
        this.alertas = response;
        this.loading = false;
      },
      error: (err) => {
        if (err?.status === 0) {
          this.error = 'No se pudo conectar con el servidor. Verifica que el backend esté corriendo.';
        } else {
          this.error = 'No se pudo cargar la lista de alertas.';
        }
        this.loading = false;
      }
    });
  }

  clearParcelaFilter(): void {
    this.parcelaIdFiltro = undefined;
    this.load();
  }

  loadParcelas(): void {
    this.parcelasService.list().subscribe({
      next: (response) => {
        this.parcelas = response;
        if (this.parcelas.length > 0 && this.model.parcelaId === 0) {
          this.model.parcelaId = this.parcelas[0].id ?? 0;
        }
      }
    });
  }

  create(): void {
    if (!this.model.descripcion.trim()) {
      this.toastService.warning('Campo requerido', 'Ingresa la descripción de la alerta.');
      return;
    }

    this.alertasService.create({
      ...this.model,
      descripcion: this.model.descripcion.trim()
    }).subscribe({
      next: () => {
        this.toastService.success('Alerta registrada');
        this.model.descripcion = '';
        this.showForm = false;
        this.load();
      },
      error: (err) => {
        this.toastService.error('Error', this.httpErrorService.toMessage(err, 'No se pudo registrar la alerta.'));
      }
    });
  }

  atender(id: number): void {
    this.alertasService.atender(id).subscribe({
      next: (updated) => {
        // Actualizar localmente sin recargar toda la lista
        const idx = this.alertas.findIndex(a => a.id === id);
        if (idx !== -1) this.alertas[idx] = updated;
      },
      error: () => { this.error = 'No se pudo atender la alerta.'; }
    });
  }

  descartar(id: number): void {
    this.alertasService.descartar(id).subscribe({
      next: (updated) => {
        // Actualizar localmente sin recargar toda la lista
        const idx = this.alertas.findIndex(a => a.id === id);
        if (idx !== -1) this.alertas[idx] = updated;
      },
      error: () => { this.error = 'No se pudo descartar la alerta.'; }
    });
  }

  delete(id: number): void {
    this.alertasService.remove(id).subscribe({
      next: () => this.load(),
      error: () => {
        this.error = 'No se pudo eliminar la alerta.';
      }
    });
  }

  restore(id: number): void {
    this.alertasService.restore(id).subscribe({
      next: () => this.load(),
      error: () => {
        this.error = 'No se pudo restaurar la alerta.';
      }
    });
  }

  getIconForTipo(tipo: string): string {
    switch(tipo) {
      case 'PLAGA': return '🐛';
      case 'SEQUIA': return '☀️';
      case 'LLUVIA_INTENSA': return '🌧️';
      case 'TEMPERATURA': return '🌡️';
      default: return '⚠️';
    }
  }
}
