import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { FiltroResultadoComponent } from './filtro-resultado.component';

@NgModule({
  declarations: [
    FiltroResultadoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [],
  exports: [FiltroResultadoComponent]
})
export class FiltroResultadoModule { }
