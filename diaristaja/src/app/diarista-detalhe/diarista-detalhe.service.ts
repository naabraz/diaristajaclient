import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { AppConfig } from './../common/app.config';
import { Observable } from 'rxjs/Observable';

import { IDiarista } from './../common/base/interface/idiarista.interface';
import { map } from "rxjs/operator/map";

export type DiaristaByIdRetrieveListType = { status: number, result: IDiarista};

@Injectable()
export class DiaristaDetalheService {

  constructor(private http: Http) { }

  private appURL = AppConfig.APP_URL;

  public getDiaristaById(id: number): Observable<DiaristaByIdRetrieveListType> {
        return this.http.get(this.appURL+"/"+id)
            .map((response: Response) => <DiaristaByIdRetrieveListType>response.json());
    }

}
