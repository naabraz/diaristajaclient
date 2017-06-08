import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";

import 'rxjs/add/operator/map';

import { AppConfig } from './../app.config';
import { Observable } from "rxjs/Observable";

import { IDiarista } from './../base/idiarista.interface';

export type DiaristaRetrieveListType= { status: number, result: string, resultList: IDiarista[] };

@Injectable()
export class MapService {

    constructor(private http: Http) { }

    private appURL = AppConfig.APP_URL;

    public getDiaristas(): Observable<DiaristaRetrieveListType> {
        return this.http.get(this.appURL)
            .map((response: Response) => <DiaristaRetrieveListType>response.json());
    }
}