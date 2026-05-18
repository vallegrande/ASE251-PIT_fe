import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorService {
  toMessage(error: unknown, fallback: string): string {
    if (!(error instanceof HttpErrorResponse)) {
      return fallback;
    }

    const backendMessage = this.getBackendMessage(error);
    if (backendMessage) {
      return backendMessage;
    }

    switch (error.status) {
      case 0:
        return 'No se pudo conectar con el backend. Verifica que Spring Boot esté activo en http://localhost:8085.';
      case 400:
        return 'La solicitud tiene datos inválidos. Revisa los campos e inténtalo nuevamente.';
      case 401:
        return 'Credenciales inválidas';
      case 404:
        return 'El recurso solicitado no existe.';
      case 503:
        return 'El servicio no está disponible temporalmente. Inténtalo en unos minutos.';
      case 500:
        return 'El servidor respondió con un error interno.';
      default:
        return fallback;
    }
  }

  private getBackendMessage(error: HttpErrorResponse): string | null {
    if (typeof error.error === 'string' && error.error.trim()) {
      return error.error;
    }

    if (error.error && typeof error.error === 'object') {
      const candidate = error.error.mensaje ?? error.error.message ?? error.error.error ?? error.error.details;
      if (typeof candidate === 'string' && candidate.trim()) {
        return candidate;
      }
    }

    return null;
  }
}
