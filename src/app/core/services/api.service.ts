import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

/**
 * Servicio centralizado para construir URLs de API.
 * Usa la configuración de environment para la base URL.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiBase = environment.apiUrl.replace(/\/+$/, '');

  /** Construye la URL completa para un recurso */
  endpoint(resource: string): string {
    return `${this.apiBase}/${resource.replace(/^\/+/, '')}`;
  }
}
