import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { AppConfig } from './../app.config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { IDiarista } from './../base/interface/idiarista.interface';
import { Diarista } from './../base/model/diarista-model';
import { FiltroLocalizacao } from './../base/model/filtro-localizacao-model';
import { Validator } from './../base/model/validator-model';

export interface DiaristaRetrieveListType { status: number; result: string; resultList: IDiarista[]; validators: Validator[]; };

@Injectable()
export class MapService {

  private appURL = AppConfig.APP_URL;

  constructor(private http: Http) { }


  public getDiaristas(): Observable<DiaristaRetrieveListType> {
    return this.http.get(this.appURL + '/diaristas')
      .map((response: Response) => <DiaristaRetrieveListType>response.json());
  }

  public getDiaristasByLocalization(filtroLocalizacao: FiltroLocalizacao): Observable<DiaristaRetrieveListType> {

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.appURL + '/diaristas/filtro/localizacao', filtroLocalizacao, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  private extractData(res: Response) {
    const body = res.json();

    return body;
  }
  private handleErrorObservable(error: Response | any) {
    console.error('ERROR ' + error.message || error);
    return Observable.throw(error.message || error);
  }
}
