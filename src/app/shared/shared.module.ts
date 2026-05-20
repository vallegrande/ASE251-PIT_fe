import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCardComponent } from './components/stat-card/stat-card.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [StatCardComponent, LoaderComponent, ToastComponent],
  imports: [CommonModule],
  exports: [CommonModule, StatCardComponent, LoaderComponent, ToastComponent]
})
export class SharedModule {}
