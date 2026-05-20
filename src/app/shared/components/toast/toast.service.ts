import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToastMessage {
  id: number;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts: ToastMessage[] = [];
  private toastSubject = new Subject<ToastMessage[]>();
  private idCounter = 0;

  toasts$ = this.toastSubject.asObservable();

  show(toast: Omit<ToastMessage, 'id'>) {
    const newToast: ToastMessage = { ...toast, id: ++this.idCounter };
    this.toasts.push(newToast);
    this.toastSubject.next([...this.toasts]);

    const duration = toast.duration || 3000;
    setTimeout(() => this.remove(newToast.id), duration);
  }

  success(title: string, message?: string) {
    this.show({ type: 'success', title, message });
  }

  error(title: string, message?: string) {
    this.show({ type: 'error', title, message, duration: 5000 });
  }

  warning(title: string, message?: string) {
    this.show({ type: 'warning', title, message, duration: 4000 });
  }

  remove(id: number) {
    this.toasts = this.toasts.filter(t => t.id !== id);
    this.toastSubject.next([...this.toasts]);
  }
}
