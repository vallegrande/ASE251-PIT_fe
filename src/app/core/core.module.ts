import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LayoutComponent } from './layout/layout.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ApiConfigInterceptor } from './interceptors/api-config.interceptor';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [CommonModule, RouterModule, LayoutComponent, SharedModule]
})
export class CoreModule {}
