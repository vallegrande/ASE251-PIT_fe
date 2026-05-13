import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { DashboardPageComponent } from './features/dashboard/pages/dashboard-page/dashboard-page.component';
import { DashboardMetricsComponent } from './features/dashboard/components/dashboard-metrics/dashboard-metrics.component';
import { ParcelasPageComponent } from './features/parcelas/pages/parcelas-page/parcelas-page.component';
import { ParcelaTableComponent } from './features/parcelas/components/parcela-table/parcela-table.component';
import { AlertasPageComponent } from './features/alertas/pages/alertas-page/alertas-page.component';
import { AlertaListComponent } from './features/alertas/components/alerta-list/alerta-list.component';

@NgModule({
  declarations: [
    App,
    DashboardPageComponent,
    DashboardMetricsComponent,
    ParcelasPageComponent,
    ParcelaTableComponent,
    AlertasPageComponent,
    AlertaListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CoreModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App]
})
export class AppModule { }
