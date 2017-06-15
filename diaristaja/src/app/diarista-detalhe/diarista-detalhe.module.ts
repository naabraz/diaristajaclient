import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiaristaDetalheComponent } from './diarista-detalhe.component';

@NgModule({
  declarations: [
    DiaristaDetalheComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [],
  bootstrap: [],
  exports: [DiaristaDetalheComponent]
})
export class DiaristaDetalheModule { }
