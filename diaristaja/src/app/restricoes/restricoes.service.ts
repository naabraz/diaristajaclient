import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';

import { Validator } from './../common/base/model/validator-model';
import { Restricao } from './../common/base/model/restricao-model';

import { AppConfig } from './../common/app.config';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw';

export type RestricaoRetrieveListType= { status: number, result: Restricao, resultList: Restricao[], validators: Validator[] };

@Injectable()
export class RestricaoService {
    private appURL = AppConfig.APP_URL;
    private http: Http;

    constructor() { }

    getRestricoes(): Observable<RestricaoRetrieveListType> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.appURL+"/restricoes", options)
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