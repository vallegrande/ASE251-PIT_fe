import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthUser, LoginRequest, RegisterRequest } from '../../features/auth/interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'arona_auth_user';
  private readonly TOKEN_KEY = 'arona_auth_token';
  private readonly base = environment.authApiUrl;

  constructor(private readonly http: HttpClient) {}

  login(credentials: LoginRequest): Observable<AuthUser> {
    return this.http.post<any>(`${this.base}/usuarios/login`, credentials).pipe(
      map(u => {
        const authUser: AuthUser = {
          id: u.idUsuario,
          username: u.username ?? '',
          correo: u.correo,
          nombreCompleto: u.nombreCompleto,
          rol: u.rol,
          area: u.area,
          estado: u.estado
        };
        const token = btoa(`${authUser.correo}:${Date.now()}`);
        this.saveSession(authUser, token);
        return authUser;
      }),
      catchError(err => {
        if (err.status === 401) {
          return throwError(() => new Error('Credenciales inválidas. Verifica tu correo y contraseña.'));
        }
        return throwError(() => new Error('Error de conexión con el servidor.'));
      })
    );
  }

  register(userData: RegisterRequest): Observable<any> {
    return this.http.post<any>(`${this.base}/usuarios`, userData);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): AuthUser | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) return null;
    try {
      return JSON.parse(data) as AuthUser;
    } catch {
      return null;
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
  }

  private saveSession(user: AuthUser, token: string): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    localStorage.setItem(this.TOKEN_KEY, token);
  }
}
