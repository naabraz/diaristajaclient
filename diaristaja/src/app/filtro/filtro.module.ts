import { AgmCoreModule } from 'angular2-google-maps/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FiltroComponent } from './filtro.component';

@NgModule({
  declarations: [
    FiltroComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [],
  exports: [FiltroComponent]
})
export class FiltroModule { }
