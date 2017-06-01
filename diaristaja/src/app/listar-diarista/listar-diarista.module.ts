import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ListarDiaristaComponent } from './listar-diarista.component';
import { ListarDiaristaService } from './listar-diarista.service';

@NgModule({
  declarations: [
    ListarDiaristaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ListarDiaristaService],
  bootstrap: [],
  exports: [ListarDiaristaComponent]
})

export class ListarDiaristaModule { }
