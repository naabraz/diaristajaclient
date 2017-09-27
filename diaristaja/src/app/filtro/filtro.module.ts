import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MatSliderModule } from '@angular/material';

import { AgmCoreModule } from '@agm/core';
import { RestricoesModule } from './../restricoes/restricoes.module';

import { FiltroComponent } from './filtro.component';

@NgModule({
  declarations: [
    FiltroComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RestricoesModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [],
  exports: [FiltroComponent]
})
export class FiltroModule { }
