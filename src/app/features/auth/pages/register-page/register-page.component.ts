import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import Swal from 'sweetalert2';
import { RegisterRequest } from '../../interfaces/auth.interface';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
  standalone: false
})
export class RegisterPageComponent {
  model: RegisterRequest = {
    nombreCompleto: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefono: '',
    direccion: '',
    areaTrabajo: ''
  };

  loading = false;
  showPassword = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  onSubmit(): void {
    if (!this.model.nombreCompleto.trim() || !this.model.email.trim() ||
        !this.model.username.trim() || !this.model.password.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos requeridos',
        text: 'Completa todos los campos obligatorios.',
        confirmButtonColor: '#059669'
      });
      return;
    }

    if (this.model.password !== this.model.confirmPassword) {
      Swal.fire({
        icon: 'warning',
        title: 'Contraseñas no coinciden',
        text: 'Las contraseñas ingresadas deben ser iguales.',
        confirmButtonColor: '#059669'
      });
      return;
    }

    if (this.model.password.length < 4) {
      Swal.fire({
        icon: 'warning',
        title: 'Contraseña muy corta',
        text: 'La contraseña debe tener al menos 4 caracteres.',
        confirmButtonColor: '#059669'
      });
      return;
    }

    this.loading = true;

    this.authService.register({
      ...this.model,
      nombreCompleto: this.model.nombreCompleto.trim(),
      username: this.model.username.trim(),
      email: this.model.email.trim().toLowerCase(),
      telefono: this.model.telefono.trim(),
      direccion: this.model.direccion.trim(),
      areaTrabajo: this.model.areaTrabajo.trim()
    }).subscribe({
      next: () => {
        this.loading = false;
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'Tu cuenta ha sido creada en el backend. Ahora puedes iniciar sesión.',
          confirmButtonColor: '#059669'
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (err) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar',
          text: err.message || 'No se pudo crear la cuenta. Verifica los datos.',
          confirmButtonColor: '#059669'
        });
      }
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
