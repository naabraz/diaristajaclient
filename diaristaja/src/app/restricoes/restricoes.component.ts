import { Component, OnInit } from '@angular/core';

import { RestricaoService, RestricaoRetrieveListType } from './../restricoes/restricoes.service';
import { Restricao } from "app/common/base/model/restricao-model";
import { Http } from "@angular/http";

@Component({
  selector: 'app-restricoes',
  templateUrl: './restricoes.component.html',
  styleUrls: ['./restricoes.component.css'],
  providers: [RestricaoService]
  
})
export class RestricoesComponent implements OnInit {

  public restricoes: Restricao[];
  public checked: false;
  public restricoesSelecionadas: Restricao[] = [];

  constructor(private http: Http) { }

  ngOnInit() {
    this.getListgetRestricoes();
  }

  public getListgetRestricoes() {
    let restricaoService = new RestricaoService(this.http);
    restricaoService.getRestricoes().subscribe((data: RestricaoRetrieveListType) => { this.restricoes = <Restricao[]>data.resultList },
      error => console.log(error),
      () => console.log('Restricoes-Master -> Get Restricoes Complete ==> :1', this.restricoes));
  }

  public saveUsername (restricao, index, event){

    if (event.target.checked) {
      this.restricoesSelecionadas.push(restricao)      
    } else {
      this.removeItem(restricao)    
    }
    
  }

  private removeItem(restricao: Restricao) {
    let index = this.restricoesSelecionadas.indexOf(restricao);
    this.restricoesSelecionadas.splice(index, 1);
}

}
