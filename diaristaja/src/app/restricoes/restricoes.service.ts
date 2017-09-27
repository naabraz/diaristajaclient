import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';

import { Validator } from './../common/base/model/validator-model';
import { Restricao } from './../common/base/model/restricao-model';

import { AppConfig } from './../common/app.config';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

export type RestricaoRetrieveListType= { status: number, result: Restricao, resultList: Restricao[], validators: Validator[] };

@Injectable()
export class RestricaoService {
    private appURL = AppConfig.APP_URL;

    constructor(private http: Http) { }

    public getRestricoes(): Observable<RestricaoRetrieveListType> {

            return this.http.get(this.appURL + '/restricoes')
            .map((response: Response) => <RestricaoRetrieveListType>response.json());
    }

}
