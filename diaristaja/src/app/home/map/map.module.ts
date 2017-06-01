import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MapComponent } from './map.component';

import { AgmCoreModule } from 'angular2-google-maps/core';

@NgModule({
  declarations: [
    MapComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDCXlLtvgOpi8GcIxH8Q1puCiUv2BVljfM'
    })
  ],
  providers: [],
  bootstrap: [],
  exports: [MapComponent]
})
export class MapModule { }
