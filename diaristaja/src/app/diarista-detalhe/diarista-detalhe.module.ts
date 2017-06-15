import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiaristaDetalheComponent } from './diarista-detalhe.component';
import { DiaristaDetalheRoutingModule } from './diarista-detalhe.routing.module';

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
