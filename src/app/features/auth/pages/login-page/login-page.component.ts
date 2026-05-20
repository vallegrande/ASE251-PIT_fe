import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  standalone: false
})
export class LoginPageComponent {
  private readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  email = '';
  password = '';
  remember = false;
  loading = false;
  showPassword = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
    const saved = localStorage.getItem('arona_remember_email');
    if (saved) {
      this.email = saved;
      this.remember = true;
    }
  }

  onSubmit(): void {
    const email = this.email.trim();
    const password = this.password.trim();

    if (!email || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos requeridos',
        text: 'Ingresa tu email y contraseña.',
        confirmButtonColor: '#059669'
      });
      return;
    }

    if (!this.EMAIL_REGEX.test(email)) {
      Swal.fire({
        icon: 'warning',
        title: 'Email inválido',
        text: 'Ingresa un correo electrónico válido.',
        confirmButtonColor: '#059669'
      });
      return;
    }

    this.loading = true;

    this.authService.login({ email, password }).subscribe({
      next: (user) => {
        this.loading = false;
        if (this.remember) {
          localStorage.setItem('arona_remember_email', email);
        } else {
          localStorage.removeItem('arona_remember_email');
        }
        Swal.fire({
          icon: 'success',
          title: `¡Bienvenido, ${user.nombreCompleto}!`,
          text: 'Sesión iniciada correctamente',
          timer: 1800,
          showConfirmButton: false,
          timerProgressBar: true
        }).then(() => {
          this.router.navigate(['/dashboard']);
        });
      },
      error: (err) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error de autenticación',
          text: (err as Error).message || 'No se pudo iniciar sesión.',
          confirmButtonColor: '#059669'
        });
      }
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
