import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

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
    RestricoesModule
  ],
  providers: [],
  bootstrap: [],
  exports: [FiltroComponent]
})
export class FiltroModule { }
