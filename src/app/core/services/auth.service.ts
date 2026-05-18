import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { map, catchError, timeout } from 'rxjs/operators';
import {
  AuthUser,
  LoginResponse,
  LoginRequest,
  RegisterRequest,
  RegisterResponse
} from '../../features/auth/interfaces/auth.interface';
import { UsuariosService } from '../../features/auth/services/usuarios.service';
import { HttpErrorService } from './http-error.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'user';
  private readonly LEGACY_STORAGE_KEYS = ['currentUser', 'arona_auth_user'];

  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly httpErrorService: HttpErrorService
  ) {}

  login(credentials: LoginRequest): Observable<AuthUser> {
    return this.usuariosService.login({
      email: credentials.email,
      password: credentials.password
    }).pipe(
      timeout({ first: environment.apiTimeoutMs }),
      map((response) => {
        const authUser = this.toAuthUser(response);
        this.saveSession(authUser);
        return authUser;
      }),
      catchError(err => {
        if (err instanceof TimeoutError) {
          return throwError(() => new Error('La solicitud tardó demasiado. Inténtalo nuevamente.'));
        }

        if (err instanceof HttpErrorResponse && err.status === 401) {
          return throwError(() => new Error('Credenciales inválidas'));
        }

        return throwError(() => new Error(this.httpErrorService.toMessage(err, 'No se pudo iniciar sesión.')));
      })
    );
  }

  register(userData: RegisterRequest): Observable<RegisterResponse> {
    return this.usuariosService.register(userData).pipe(
      catchError((err) => throwError(() => new Error(this.httpErrorService.toMessage(err, 'No se pudo registrar el usuario.'))))
    );
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  getCurrentUser(): AuthUser | null {
    const data = localStorage.getItem(this.STORAGE_KEY)
      ?? this.findLegacySession();
    if (!data) return null;
    try {
      return JSON.parse(data) as AuthUser;
    } catch {
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.LEGACY_STORAGE_KEYS.forEach(key => localStorage.removeItem(key));
  }

  private saveSession(user: AuthUser): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
  }

  private toAuthUser(user: LoginResponse): AuthUser {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      nombreCompleto: user.nombreCompleto,
      telefono: user.telefono ?? null,
      direccion: user.direccion ?? null,
      fechaRegistro: null,
      rol: user.rol ?? null,
      estado: user.estado ?? null
    };
  }

  private findLegacySession(): string | null {
    for (const key of this.LEGACY_STORAGE_KEYS) {
      const data = localStorage.getItem(key);
      if (data) {
        return data;
      }
    }
    return null;
  }
}
