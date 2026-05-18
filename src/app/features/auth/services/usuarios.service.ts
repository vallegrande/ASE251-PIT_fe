import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  UsuarioApi,
  UsuarioEstado,
  UsuarioRol
} from '../interfaces/auth.interface';
import { ApiService } from '../../../core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  constructor(
    private readonly http: HttpClient,
    private readonly api: ApiService
  ) {}

  list(): Observable<UsuarioApi[]> {
    return this.http.get<UsuarioApi[]>(this.api.endpoint('usuarios'));
  }

  getById(id: number): Observable<UsuarioApi> {
    return this.http.get<UsuarioApi>(this.api.endpoint(`usuarios/${id}`));
  }

  getByUsername(username: string): Observable<UsuarioApi> {
    return this.http.get<UsuarioApi>(this.api.endpoint(`usuarios/username/${encodeURIComponent(username)}`));
  }

  getByEmail(email: string): Observable<UsuarioApi> {
    const params = new HttpParams().set('email', email);
    return this.http.get<UsuarioApi>(this.api.endpoint('usuarios/email'), { params });
  }

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.api.endpoint('usuarios/login'), payload);
  }

  getByRol(rol: UsuarioRol): Observable<UsuarioApi[]> {
    return this.http.get<UsuarioApi[]>(this.api.endpoint(`usuarios/rol/${rol}`));
  }

  getByEstado(estado: UsuarioEstado): Observable<UsuarioApi[]> {
    return this.http.get<UsuarioApi[]>(this.api.endpoint(`usuarios/estado/${estado}`));
  }

  getActivosByRol(rol: UsuarioRol): Observable<UsuarioApi[]> {
    return this.http.get<UsuarioApi[]>(this.api.endpoint(`usuarios/rol/${rol}/activos`));
  }

  create(payload: UsuarioApi): Observable<UsuarioApi> {
    return this.http.post<UsuarioApi>(this.api.endpoint('usuarios'), payload);
  }

  register(payload: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(this.api.endpoint('usuarios/registrar'), payload);
  }

  update(id: number, payload: UsuarioApi): Observable<UsuarioApi> {
    return this.http.put<UsuarioApi>(this.api.endpoint(`usuarios/${id}`), payload);
  }

  changePassword(id: number, nuevaPassword: string): Observable<UsuarioApi> {
    const params = new HttpParams().set('nuevaPassword', nuevaPassword);
    return this.http.patch<UsuarioApi>(this.api.endpoint(`usuarios/${id}/password`), null, { params });
  }

  changeEstado(id: number, estado: UsuarioEstado): Observable<UsuarioApi> {
    const params = new HttpParams().set('estado', estado);
    return this.http.patch<UsuarioApi>(this.api.endpoint(`usuarios/${id}/estado`), null, { params });
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(this.api.endpoint(`usuarios/${id}`));
  }

  countActivos(): Observable<number> {
    return this.http.get<number>(this.api.endpoint('usuarios/activos/contar'));
  }
}
