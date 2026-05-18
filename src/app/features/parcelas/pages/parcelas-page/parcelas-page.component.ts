import { Component, OnInit } from '@angular/core';
import { Parcela, ParcelaRequest } from '../../interfaces/parcela.interface';
import { ParcelasService } from '../../services/parcelas.service';
import Swal from 'sweetalert2';
import { HttpErrorService } from '../../../../core/services/http-error.service';

@Component({
  selector: 'app-parcelas-page',
  templateUrl: './parcelas-page.component.html',
  styleUrl: './parcelas-page.component.css',
  standalone: false
})
export class ParcelasPageComponent implements OnInit {
  parcelas: Parcela[] = [];
  searchQuery = '';
  loading = true;
  error: string | null = null;
  showForm = false;
  editingId: number | null = null;

  readonly estados = [
    { value: 'ACTIVA', label: 'Activa' },
    { value: 'INACTIVA', label: 'Inactiva' },
    { value: 'BAJO_MANTENIMIENTO', label: 'Bajo mantenimiento' }
  ];

  model: ParcelaRequest = this.emptyModel();

  constructor(
    private readonly parcelasService: ParcelasService,
    private readonly httpErrorService: HttpErrorService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = null;
    this.parcelasService.list().subscribe({
      next: (response) => {
        this.parcelas = response;
        this.loading = false;
      },
      error: (err) => {
        this.error = this.httpErrorService.toMessage(err, 'No se pudo cargar la lista de parcelas.');
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    if (!this.searchQuery.trim()) {
      this.load();
      return;
    }
    this.loading = true;
    this.parcelasService.list({ nombre: this.searchQuery }).subscribe({
      next: (response) => {
        this.parcelas = response;
        this.loading = false;
      },
      error: (err) => {
        this.error = this.httpErrorService.toMessage(err, 'Error al buscar parcelas.');
        this.loading = false;
      }
    });
  }

  openCreate(): void {
    this.editingId = null;
    this.model = this.emptyModel();
    this.showForm = true;
  }

  openEdit(parcela: Parcela): void {
    this.editingId = parcela.id ?? null;
    this.model = {
      nombre: parcela.nombre,
      area: parcela.area,
      ubicacion: parcela.ubicacion,
      tipoSuelo: parcela.tipoSuelo ?? null,
      cultivo: parcela.cultivo ?? null,
      descripcion: parcela.descripcion ?? null,
      estado: parcela.estado,
      usuario: (parcela.usuario && parcela.usuario.id) ? { id: parcela.usuario.id } : null
    };
    this.showForm = true;
  }

  save(): void {
    if (!this.model.nombre.trim() || !this.model.ubicacion.trim() || this.model.area <= 0) {
      Swal.fire({ icon: 'warning', title: 'Campos requeridos', text: 'Completa nombre, ubicación y área.', confirmButtonColor: '#059669' });
      return;
    }

    const action = this.editingId
      ? this.parcelasService.update(this.editingId, this.model)
      : this.parcelasService.create(this.model);

    action.subscribe({
      next: () => {
        Swal.fire({ icon: 'success', title: this.editingId ? 'Parcela actualizada' : 'Parcela creada', timer: 1500, showConfirmButton: false, timerProgressBar: true });
        this.showForm = false;
        this.model = this.emptyModel();
        this.load();
      },
      error: (err) => {
        Swal.fire({ icon: 'error', title: 'Error', text: this.httpErrorService.toMessage(err, 'No se pudo guardar la parcela.'), confirmButtonColor: '#059669' });
      }
    });
  }

  delete(id: number): void {
    Swal.fire({
      title: '¿Eliminar parcela?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.parcelasService.remove(id).subscribe({
          next: () => {
            Swal.fire({ icon: 'success', title: 'Parcela eliminada', timer: 1500, showConfirmButton: false });
            this.load();
          },
          error: (err) => {
            Swal.fire({ icon: 'error', title: 'Error', text: this.httpErrorService.toMessage(err, 'No se pudo eliminar la parcela.'), confirmButtonColor: '#059669' });
          }
        });
      }
    });
  }

  cancelForm(): void {
    this.showForm = false;
    this.editingId = null;
    this.model = this.emptyModel();
  }

  private emptyModel(): ParcelaRequest {
    return {
      nombre: '',
      area: 0,
      ubicacion: '',
      tipoSuelo: null,
      cultivo: null,
      descripcion: null,
      estado: 'ACTIVA',
      usuario: null
    };
  }
}
