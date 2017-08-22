import { Component, OnInit } from '@angular/core';

import { RestricaoService, RestricaoRetrieveListType } from './../restricoes/restricoes.service';
import { Restricao } from "app/common/base/model/restricao-model";

@Component({
  selector: 'app-restricoes',
  templateUrl: './restricoes.component.html',
  styleUrls: ['./restricoes.component.css'],
  providers: [RestricaoService]
  
})
export class RestricoesComponent implements OnInit {

  public restricoes: Restricao[];

  constructor() { }

  ngOnInit() {
  }

  public getListgetRestricoes() {
    let restricaoService = new RestricaoService();
    restricaoService.getRestricoes().subscribe((data: RestricaoRetrieveListType) => { this.restricoes = <Restricao[]>data.resultList },
      error => console.log(error),
      () => console.log('Restricoes-Master -> Get Restricoes Complete ==> :1', this.restricoes));
  }

}
