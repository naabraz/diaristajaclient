import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AgmCoreModule } from '@agm/core';

import { DiaristaCadastroComponent } from './diarista-cadastro.component';

@NgModule({
  declarations: [
    DiaristaCadastroComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [],
  exports: [DiaristaCadastroComponent]
})
export class DiaristaCadastroModule { }