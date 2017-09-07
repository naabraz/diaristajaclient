import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';

import { Validator } from './../common/base/model/validator-model';
import { AppConfig } from './../common/app.config';
import { Diarista } from './../common/base/model/diarista-model';
import { FiltroAvancado } from './../common/base/model/filtro-avancado-model';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw';

export type FiltroAvancadoRetrieveListType = { status: number, result: Diarista, resultList: Diarista[], validators: Validator[] };

@Injectable()
export class FiltroService {
  private appURL = AppConfig.APP_URL;

  constructor(private http: Http) { }

  searchFilter(filtroAvancado: FiltroAvancado): Observable<FiltroAvancadoRetrieveListType> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log(filtroAvancado);
    return this.http.post(this.appURL + "/diaristas/filtro/avancado", filtroAvancado, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  private extractData(res: Response) {
    let body = res.json();

    return body;
  }

  private handleErrorObservable(error: Response | any) {
    console.error('ERROR ' + error.message || error);
    return Observable.throw(error.message || error);
  }

}
