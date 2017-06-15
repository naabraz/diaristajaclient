import { Http } from '@angular/http';
import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { IDiarista } from './../common/base/interface/idiarista.interface';
import { DiaristaDetalheService, DiaristaByIdRetrieveListType } from './diarista-detalhe.service';

import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'diarista-detalhe',
  templateUrl: './diarista-detalhe.component.html',
  styleUrls: ['./diarista-detalhe.component.css']
})
export class DiaristaDetalheComponent implements OnInit {

  id: number;
  inscricao: Subscription;

  diarista: IDiarista;

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private ngZone: NgZone) { }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];

        this.retrieveDiaristaById(this.id);
      }
    );
  }

  retrieveDiaristaById(id: number){
    let diaristaDetalheService = new DiaristaDetalheService(this.http);
        diaristaDetalheService.getDiaristaById(id).subscribe((data: DiaristaByIdRetrieveListType) => { this.diarista = <IDiarista>data.result},
      error => console.log(error),
      () => console.log('DiaristaDetalhe-Master -> Get DiaristaById Complete ==> :1', this.diarista));
  }

}
