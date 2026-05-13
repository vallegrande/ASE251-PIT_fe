import { Component, OnInit } from '@angular/core';
import { Parcela, ParcelaRequest } from '../../interfaces/parcela.interface';
import { ParcelasService } from '../../services/parcelas.service';

@Component({
  selector: 'app-parcelas-page',
  templateUrl: './parcelas-page.component.html',
  styleUrl: './parcelas-page.component.css',
  standalone: false
})
export class ParcelasPageComponent implements OnInit {
  parcelas: Parcela[] = [];
  nombreFiltro = '';
  estadoFiltro = '';
  loading = true;
  error: string | null = null;

  readonly estados = [
    { value: 'ACTIVO', label: 'Activo' },
    { value: 'EN_RIESGO', label: 'En riesgo' },
    { value: 'INACTIVO', label: 'Inactivo' }
  ];

  model: ParcelaRequest = {
    nombre: '',
    area: 0,
    ubicacion: '',
    estado: 'ACTIVO',
    humedad: null,
    temperatura: null,
    fechaSiembra: null,
    fechaCosechaEstimada: null
  };

  constructor(private readonly parcelasService: ParcelasService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = null;
    this.parcelasService.list(this.nombreFiltro, this.estadoFiltro).subscribe({
      next: (response) => {
        this.parcelas = response;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar la lista de parcelas.';
        this.loading = false;
      }
    });
  }

  create(): void {
    this.parcelasService.create(this.model).subscribe({
      next: () => {
        this.resetModel();
        this.load();
      },
      error: () => {
        this.error = 'No se pudo registrar la parcela. Verifica los datos.';
      }
    });
  }

  delete(id: number): void {
    this.parcelasService.remove(id).subscribe({
      next: () => this.load(),
      error: () => {
        this.error = 'No se pudo eliminar la parcela.';
      }
    });
  }

  private resetModel(): void {
    this.model = {
      nombre: '',
      area: 0,
      ubicacion: '',
      estado: 'ACTIVO',
      humedad: null,
      temperatura: null,
      fechaSiembra: null,
      fechaCosechaEstimada: null
    };
  }
}
