import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Validator } from './../common/base/model/validator-model';
import { Diarista } from './../common/base/model/diarista-model';

import { AppConfig } from './../common/app.config';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

export type DiaristaRetrieveListType = { status: number, result: Diarista, resultList: Diarista[], validators: Validator[] };

@Injectable()
export class DiaristaService {
    private appURL = AppConfig.APP_URL;

    constructor(private http: Http) { }

    public saveDiarista(diarista: Diarista): Observable<DiaristaRetrieveListType> {
        console.log(diarista);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        return this.http.post(this.appURL + '/diaristas', diarista, options)
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
