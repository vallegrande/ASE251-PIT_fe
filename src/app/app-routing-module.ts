import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginPageComponent } from './features/auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './features/auth/pages/register-page/register-page.component';
import { DashboardPageComponent } from './features/dashboard/pages/dashboard-page/dashboard-page.component';
import { ParcelasPageComponent } from './features/parcelas/pages/parcelas-page/parcelas-page.component';
import { AlertasPageComponent } from './features/alertas/pages/alertas-page/alertas-page.component';
import { MonitoreoPageComponent } from './features/monitoreo/pages/monitoreo-page/monitoreo-page.component';

const routes: Routes = [
  // Auth routes (sin layout)
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },

  // Rutas protegidas (con layout)
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardPageComponent },
      { path: 'parcelas', component: ParcelasPageComponent },
      { path: 'monitoreo', component: MonitoreoPageComponent },
      { path: 'alertas', component: AlertasPageComponent }
    ]
  },

  // Wildcard
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
