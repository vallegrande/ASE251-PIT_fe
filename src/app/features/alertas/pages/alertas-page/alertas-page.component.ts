import { Component, OnInit } from '@angular/core';
import { Alerta, AlertaRequest } from '../../interfaces/alerta.interface';
import { AlertasService } from '../../services/alertas.service';
import { Parcela } from '../../../parcelas/interfaces/parcela.interface';
import { ParcelasService } from '../../../parcelas/services/parcelas.service';
import Swal from 'sweetalert2';
import { HttpErrorService } from '../../../../core/services/http-error.service';

@Component({
  selector: 'app-alertas-page',
  templateUrl: './alertas-page.component.html',
  styleUrl: './alertas-page.component.css',
  standalone: false
})
export class AlertasPageComponent implements OnInit {
  alertas: Alerta[] = [];
  parcelas: Parcela[] = [];
  loading = true;
  error: string | null = null;
  showForm = false;

  readonly tipos = ['PLAGA', 'SEQUIA', 'LLUVIA_INTENSA', 'CALOR_EXCESIVO', 'HUMEDAD_BAJA', 'ENFERMEDAD', 'OTRO'];
  readonly niveles = ['BAJA', 'MEDIA', 'ALTA', 'CRITICA'];

  model: AlertaRequest = {
    parcela: { id: 0 },
    tipo: 'PLAGA',
    nivelRiesgo: 'MEDIA',
    mensaje: ''
  };

  constructor(
    private readonly alertasService: AlertasService,
    private readonly parcelasService: ParcelasService,
    private readonly httpErrorService: HttpErrorService
  ) {}

  ngOnInit(): void {
    this.load();
    this.loadParcelas();
  }

  load(): void {
    this.loading = true;
    this.error = null;
    this.alertasService.list().subscribe({
      next: (response) => {
        this.alertas = response;
        this.loading = false;
      },
      error: (err) => {
        this.error = this.httpErrorService.toMessage(err, 'No se pudo cargar la lista de alertas.');
        this.loading = false;
      }
    });
  }

  loadParcelas(): void {
    this.parcelasService.list().subscribe({
      next: (response) => {
        this.parcelas = response;
        if (this.parcelas.length > 0 && this.model.parcela.id === 0) {
          this.model.parcela.id = this.parcelas[0].id ?? 0;
        }
      }
    });
  }

  create(): void {
    if (!this.model.mensaje.trim()) {
      Swal.fire({ icon: 'warning', title: 'Campo requerido', text: 'Ingresa la descripción de la alerta.', confirmButtonColor: '#059669' });
      return;
    }

    this.alertasService.create({
      ...this.model,
      mensaje: this.model.mensaje.trim()
    }).subscribe({
      next: () => {
        Swal.fire({ icon: 'success', title: 'Alerta registrada', timer: 1500, showConfirmButton: false, timerProgressBar: true });
        this.model.mensaje = '';
        this.showForm = false;
        this.load();
      },
      error: (err) => {
        Swal.fire({ icon: 'error', title: 'Error', text: this.httpErrorService.toMessage(err, 'No se pudo registrar la alerta.'), confirmButtonColor: '#059669' });
      }
    });
  }

  atender(id: number): void {
    Swal.fire({
      title: '¿Atender alerta?',
      text: 'Marcar esta alerta como atendida.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#059669',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Sí, atender',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.alertasService.atender(id).subscribe({
          next: () => this.load(),
          error: (err) => Swal.fire({ icon: 'error', title: 'Error', text: this.httpErrorService.toMessage(err, 'No se pudo atender la alerta.') })
        });
      }
    });
  }

  descartar(id: number): void {
    Swal.fire({
      title: '¿Descartar alerta?',
      text: 'Esta alerta será descartada.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Sí, descartar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.alertasService.descartar(id).subscribe({
          next: () => this.load(),
          error: (err) => Swal.fire({ icon: 'error', title: 'Error', text: this.httpErrorService.toMessage(err, 'No se pudo descartar la alerta.') })
        });
      }
    });
  }
}
