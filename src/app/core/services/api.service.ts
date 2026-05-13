import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiBase = 'http://localhost:8080/api';

  endpoint(resource: string): string {
    return `${this.apiBase}/${resource}`;
  }
}
