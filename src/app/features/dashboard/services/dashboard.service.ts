import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardSummary } from '../interfaces/dashboard.interface';
import { ApiService } from '../../../core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(
    private readonly http: HttpClient,
    private readonly api: ApiService
  ) {}

  getSummary(): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(this.api.endpoint('dashboard'));
  }
}
