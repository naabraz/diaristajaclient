import { Injectable } from '@angular/core';
import { Diarista } from './../common/base/diarista-model';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { AppConfig } from './../common/app.config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw';




@Injectable()
export class DiaristaService {
    private appURL = AppConfig.APP_URL;

    constructor(private http: Http) { }

    saveDiarista(diarista: Diarista): Observable<Diarista> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.appURL, diarista, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body;
    }
    private handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }

}