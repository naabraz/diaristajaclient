import { routing } from './../../app.routes';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MapComponent } from './map.component';
import { DiaristaDetalheRoutingModule } from './../../diarista-detalhe/diarista-detalhe.routing.module';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    MapComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    routing,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDCXlLtvgOpi8GcIxH8Q1puCiUv2BVljfM',
      libraries: ["places"]
    })
  ],
  providers: [],
  bootstrap: [],
  exports: [MapComponent]
})
export class MapModule { }
