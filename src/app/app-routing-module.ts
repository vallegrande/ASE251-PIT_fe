import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { DashboardPageComponent } from './features/dashboard/pages/dashboard-page/dashboard-page.component';
import { ParcelasPageComponent } from './features/parcelas/pages/parcelas-page/parcelas-page.component';
import { AlertasPageComponent } from './features/alertas/pages/alertas-page/alertas-page.component';
import { MonitoreoPageComponent } from './features/monitoreo/pages/monitoreo-page/monitoreo-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '',          redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardPageComponent },
      { path: 'parcelas',  component: ParcelasPageComponent },
      { path: 'alertas',   component: AlertasPageComponent },
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
