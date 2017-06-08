import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";

import { AppConfig } from './../common/app.config';

import 'rxjs/add/operator/map';

@Injectable()
export class ListarDiaristaService {

  constructor(private http: Http) { }
  
  private appURL = AppConfig.APP_URL;

  getData() {
    return this.http.get(this.appURL)
    .map(response => response.text());
  }

}
