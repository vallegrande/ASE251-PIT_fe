import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

// Auth
import { LoginPageComponent } from './features/auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './features/auth/pages/register-page/register-page.component';

// Dashboard
import { DashboardPageComponent } from './features/dashboard/pages/dashboard-page/dashboard-page.component';
import { DashboardMetricsComponent } from './features/dashboard/components/dashboard-metrics/dashboard-metrics.component';
import { DashboardChartsComponent } from './features/dashboard/components/dashboard-charts/dashboard-charts.component';
import { RecentAlertsComponent } from './features/dashboard/components/recent-alerts/recent-alerts.component';

// Parcelas
import { ParcelasPageComponent } from './features/parcelas/pages/parcelas-page/parcelas-page.component';
import { ParcelaTableComponent } from './features/parcelas/components/parcela-table/parcela-table.component';

// Alertas
import { AlertasPageComponent } from './features/alertas/pages/alertas-page/alertas-page.component';
import { AlertaListComponent } from './features/alertas/components/alerta-list/alerta-list.component';

// Monitoreo
import { MonitoreoPageComponent } from './features/monitoreo/pages/monitoreo-page/monitoreo-page.component';
import { MonitoreoTableComponent } from './features/monitoreo/components/monitoreo-table/monitoreo-table.component';

@NgModule({
  declarations: [
    App,
    // Auth
    LoginPageComponent,
    RegisterPageComponent,
    // Dashboard
    DashboardPageComponent,
    DashboardMetricsComponent,
    DashboardChartsComponent,
    RecentAlertsComponent,
    // Parcelas
    ParcelasPageComponent,
    ParcelaTableComponent,
    // Alertas
    AlertasPageComponent,
    AlertaListComponent,
    // Monitoreo
    MonitoreoPageComponent,
    MonitoreoTableComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    CoreModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptorsFromDi()),
  ],
  bootstrap: [App]
})
export class AppModule { }
