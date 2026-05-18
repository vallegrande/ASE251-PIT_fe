import { Component, OnInit } from '@angular/core';
import { Monitoreo, MonitoreoRequest } from '../../interfaces/monitoreo.interface';
import { MonitoreoService } from '../../services/monitoreo.service';
import { Parcela } from '../../../parcelas/interfaces/parcela.interface';
import { ParcelasService } from '../../../parcelas/services/parcelas.service';
import Swal from 'sweetalert2';

/**
 * Página de monitoreo ambiental.
 * Permite registrar y visualizar mediciones de temperatura, humedad, etc.
 */
@Component({
  selector: 'app-monitoreo-page',
  templateUrl: './monitoreo-page.component.html',
  styleUrl: './monitoreo-page.component.css',
  standalone: false
})
export class MonitoreoPageComponent implements OnInit {
  monitoreos: Monitoreo[] = [];
  parcelas: Parcela[] = [];
  loading = true;
  error: string | null = null;
  showForm = false;

  model: MonitoreoRequest = {
    fechaMonitoreo: null,
    temperatura: null,
    humedad: null,
    precipitacion: null,
    velocidadViento: null,
    observaciones: null,
    estado: 'COMPLETADO',
    parcela: { id: 0 }
  };

  constructor(
    private readonly monitoreoService: MonitoreoService,
    private readonly parcelasService: ParcelasService
  ) {}

  ngOnInit(): void {
    this.load();
    this.loadParcelas();
  }

  load(): void {
    this.loading = true;
    this.error = null;
    this.monitoreoService.list().subscribe({
      next: (response) => {
        this.monitoreos = response;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar los registros de monitoreo.';
        this.loading = false;
      }
    });
  }

  loadParcelas(): void {
    this.parcelasService.list().subscribe({
      next: (response) => {
        this.parcelas = response;
        if (this.parcelas.length > 0 && this.model.parcela.id === 0) {
          this.model.parcela = { id: this.parcelas[0].id };
        }
      }
    });
  }

  create(): void {
    if (this.model.temperatura === null && this.model.humedad === null) {
      Swal.fire({ icon: 'warning', title: 'Datos requeridos', text: 'Ingresa al menos temperatura o humedad.', confirmButtonColor: '#059669' });
      return;
    }

    this.monitoreoService.create(this.model).subscribe({
      next: () => {
        Swal.fire({ icon: 'success', title: 'Monitoreo registrado', timer: 1500, showConfirmButton: false, timerProgressBar: true });
        this.showForm = false;
        this.resetModel();
        this.load();
      },
      error: () => {
        Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo registrar el monitoreo.', confirmButtonColor: '#059669' });
      }
    });
  }

  private resetModel(): void {
    this.model = {
      fechaMonitoreo: null,
      temperatura: null,
      humedad: null,
      precipitacion: null,
      velocidadViento: null,
      observaciones: null,
      estado: 'COMPLETADO',
      parcela: { id: this.parcelas.length > 0 ? this.parcelas[0].id : 0 }
    };
  }

  formatDate(fecha: string): string {
    if (!fecha) return '-';
    return new Date(fecha).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }
}
