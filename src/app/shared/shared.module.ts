import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppLayoutModule } from './components/layout/app.layout.module';
import { PrimeCustomModule } from './prime-custom.module';


@NgModule({
  imports: [
    CommonModule,
    PrimeCustomModule,
    AppLayoutModule
  ],
  exports: [
    CommonModule,
    PrimeCustomModule,
    AppLayoutModule,
  ]
})
export class SharedModule { }