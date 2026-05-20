import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, timeout } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiConfigInterceptor implements HttpInterceptor {
  private readonly apiBase = environment.apiUrl.replace(/\/+$/, '');
  private readonly timeoutMs = environment.apiTimeoutMs;

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!req.url.startsWith(this.apiBase)) {
      return next.handle(req);
    }

    let headers = req.headers.set('Accept', 'application/json');
    if (req.body !== null && req.body !== undefined && !headers.has('Content-Type')) {
      headers = headers.set('Content-Type', 'application/json');
    }

    const apiReq = req.clone({ headers });
    return next.handle(apiReq).pipe(timeout(this.timeoutMs));
  }
}
