import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Http } from '@angular/http';

import { RestricaoService, RestricaoRetrieveListType } from './../restricoes/restricoes.service';
import { Restricao } from 'app/common/base/model/restricao-model';

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

  @Output() restricoesEvent = new EventEmitter<Restricao[]>();

  constructor(private http: Http) { }

  ngOnInit() {
    this.getListgetRestricoes();
  }

  public getListgetRestricoes() {
    const restricaoService = new RestricaoService(this.http);

    restricaoService.getRestricoes().subscribe((data: RestricaoRetrieveListType) => {
      this.restricoes = <Restricao[]> data.resultList;
    },
    error => console.log(error),
    () => console.log('Restricoes-Master -> Get Restricoes Complete ==> :1', this.restricoes));
  }

  public saveUsername (restricao, index, event) {
    if (event.target.checked) {
      this.restricoesSelecionadas.push(restricao);
    } else {
      this.removeItem(restricao);
    }

    this.sendRestricoes();
  }

 public sendRestricoes() {
    this.restricoesEvent.emit(this.restricoesSelecionadas);
  }

  private removeItem(restricao: Restricao) {
    const index = this.restricoesSelecionadas.indexOf(restricao);
    this.restricoesSelecionadas.splice(index, 1);
  }

}
