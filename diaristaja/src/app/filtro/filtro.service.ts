import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { AppConfig } from './../common/app.config';

@Injectable()
export class FiltroService {
  private appURL = AppConfig.APP_URL;
  
  constructor(private http: Http) { }

  searchFilter(latitude: number, longitude: number, raio: number, valor: number, restricoes: number[]){
    console.log('latitude ' + latitude);
    console.log('longitude ' + longitude);
    console.log('raio ' + raio);
    console.log('valor ' + valor);
    console.log('restricoes ' + restricoes);
  }

}
