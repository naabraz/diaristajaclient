import { MapModule } from './../common/map/map.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    MapModule
  ],
  providers: [],
  bootstrap: [],
  exports: [HomeComponent]
})

export class HomeModule { }
