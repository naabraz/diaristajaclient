import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";

import 'rxjs/add/operator/map';

@Injectable()
export class ListarDiaristaService {

  constructor(private http: Http) { }
  private appURL = 'http://localhost:8080/';

  getData() {
    return this.http.get(this.appURL)
    .map(response => response.text());
  }

}
