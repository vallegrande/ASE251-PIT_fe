import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Parcela, ParcelaRequest } from '../../interfaces/parcela.interface';
import { ParcelasService } from '../../services/parcelas.service';
import Swal from 'sweetalert2';
import { HttpErrorService } from '../../../../core/services/http-error.service';
import { ToastService } from '../../../../shared/components/toast/toast.service';

@Component({
  selector: 'app-parcelas-page',
  templateUrl: './parcelas-page.component.html',
  styleUrl: './parcelas-page.component.css',
  standalone: false
})
export class ParcelasPageComponent implements OnInit, OnDestroy {
  parcelas: Parcela[] = [];
  searchQuery = '';
  loading = true;
  error: string | null = null;
  showForm = false;
  editingId: number | null = null;
  isTrashMode = false;

  private searchSubject = new Subject<string>();
  private searchSub?: Subscription;

  readonly estados = [
    { value: 'ACTIVO', label: 'Activo' },
    { value: 'EN_RIESGO', label: 'En Riesgo' },
    { value: 'INACTIVO', label: 'Inactivo' }
  ];

  model: ParcelaRequest = this.emptyModel();

  constructor(
    private readonly parcelasService: ParcelasService,
    private readonly httpErrorService: HttpErrorService,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    // Debounce 300ms en el buscador
    this.searchSub = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => this.load());

    this.load();
  }

  ngOnDestroy(): void {
    this.searchSub?.unsubscribe();
    this.searchSubject.complete();
  }

  onSearchChange(value: string): void {
    this.searchQuery = value;
    this.searchSubject.next(value);
  }

  toggleTrashMode(): void {
    this.isTrashMode = !this.isTrashMode;
    this.showForm = false;
    this.editingId = null;
    this.load();
  }

  showCreateForm(): void {
    this.showForm = true;
    this.editingId = null;
    this.error = null;
    this.model = this.emptyModel();
  }

  hideForm(): void {
    this.showForm = false;
    this.editingId = null;
    this.error = null;
    this.model = this.emptyModel();
  }

  load(): void {
    this.error = null;
    this.loading = true;
    
    const filtros: any = {};
    if (this.searchQuery?.trim()) {
      filtros.nombre = this.searchQuery.trim();
    }
    if (this.isTrashMode) {
      filtros.deleted = true;
    }

    this.parcelasService.list(filtros).subscribe({
      next: (response) => {
        this.parcelas = response;
        this.loading = false;
      },
      error: (err) => {
        this.error = this.httpErrorService.toMessage(err, 'No se pudo cargar la lista de parcelas.');
        this.loading = false;
        this.parcelas = [];
      }
    });
  }

  save(): void {
    if (!this.model.nombre?.trim() || !this.model.ubicacion?.trim() || this.model.area <= 0) {
      this.toastService.warning('Campos requeridos', 'Completa nombre, ubicación y área.');
      return;
    }

    const action = this.editingId
      ? this.parcelasService.update(this.editingId, this.model)
      : this.parcelasService.create(this.model);

    action.subscribe({
      next: () => {
        this.toastService.success(this.editingId ? 'Parcela actualizada' : 'Parcela creada');
        this.hideForm();
        this.load();
      },
      error: (err) => {
        this.toastService.error('Error', this.httpErrorService.toMessage(err, 'No se pudo guardar la parcela.'));
      }
    });
  }

  edit(parcela: Parcela): void {
    this.showForm = true;
    this.editingId = parcela.id ?? null;
    this.error = null;
    this.model = {
      nombre: parcela.nombre,
      area: parcela.area,
      ubicacion: parcela.ubicacion,
      estado: parcela.estado,
      humedad: parcela.humedad,
      temperatura: parcela.temperatura,
      fechaSiembra: parcela.fechaSiembra,
      fechaCosechaEstimada: parcela.fechaCosechaEstimada
    };
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
            this.toastService.success('Parcela eliminada');
            this.load();
          },
          error: (err) => {
            this.toastService.error('Error', this.httpErrorService.toMessage(err, 'No se pudo eliminar la parcela.'));
          }
        });
      }
    });
  }

  restore(id: number): void {
    this.parcelasService.restore(id).subscribe({
      next: () => {
        this.toastService.success('Parcela restaurada');
        this.load();
      },
      error: (err) => {
        this.toastService.error('Error', this.httpErrorService.toMessage(err, 'No se pudo restaurar la parcela.'));
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
      area: 0.1,
      ubicacion: '',
      estado: 'ACTIVO'
    };
  }
}
