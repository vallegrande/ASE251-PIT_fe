import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCardComponent } from './components/stat-card/stat-card.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [StatCardComponent, LoaderComponent],
  imports: [CommonModule],
  exports: [StatCardComponent, LoaderComponent]
})
export class SharedModule {}
