import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
  standalone: false
})
export class RegisterPageComponent {
  model = {
    nombreCompleto: '',
    correo: '',
    username: '',
    password: '',
    confirmPassword: '',
    rol: 'ENCARGADO',
    area: 'CAMPO'
  };

  loading = false;
  showPassword = false;

  readonly roles = [
    { value: 'ENCARGADO', label: 'Encargado' },
    { value: 'ADMINISTRADOR', label: 'Administrador' }
  ];

  readonly areas = [
    { value: 'CAMPO', label: 'Campo' },
    { value: 'PLANTA', label: 'Planta' },
    { value: 'ALMACEN', label: 'Almacén' },
    { value: 'ADMINISTRACION', label: 'Administración' },
    { value: 'CALIDAD', label: 'Calidad' }
  ];

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  onSubmit(): void {
    if (!this.model.nombreCompleto.trim() || !this.model.correo.trim() ||
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

    const payload = {
      nombreCompleto: this.model.nombreCompleto,
      correo: this.model.correo,
      username: this.model.username,
      password: this.model.password,
      rol: this.model.rol,
      area: this.model.area,
      estado: true
    };

    this.authService.register(payload).subscribe({
      next: () => {
        this.loading = false;
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'Tu cuenta ha sido creada. Ahora puedes iniciar sesión.',
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
          text: err.error?.message || 'No se pudo crear la cuenta. Verifica los datos.',
          confirmButtonColor: '#059669'
        });
      }
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
