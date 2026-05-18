import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, AuthUser } from '../services/auth.service';

/**
 * Layout principal del sistema.
 * Contiene el sidebar navegacional, navbar superior y área de contenido.
 */
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  standalone: false
})
export class LayoutComponent {
  sidebarCollapsed = false;
  mobileMenuOpen = false;

  /** Elementos del menú de navegación */
  readonly menuItems = [
    { path: '/dashboard', icon: 'bi-grid-1x2-fill', label: 'Dashboard' },
    { path: '/parcelas', icon: 'bi-map-fill', label: 'Parcelas' },
    { path: '/monitoreo', icon: 'bi-thermometer-half', label: 'Monitoreo' },
    { path: '/alertas', icon: 'bi-exclamation-triangle-fill', label: 'Alertas' }
  ];

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  /** Obtiene el usuario autenticado */
  get currentUser(): AuthUser | null {
    return this.authService.getCurrentUser();
  }

  /** Alterna el sidebar en escritorio */
  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  /** Alterna el menú en dispositivos móviles */
  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  /** Cierra la sesión del usuario */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  /** Obtiene las iniciales del nombre para el avatar */
  getInitials(): string {
    const name = this.currentUser?.nombreCompleto || 'U';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }
}
