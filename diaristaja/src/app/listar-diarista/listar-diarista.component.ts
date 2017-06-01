import { Component, OnInit } from '@angular/core';

import { ListarDiaristaService } from './listar-diarista.service';

@Component({
  selector: 'listar-diarista',
  templateUrl: './listar-diarista.component.html',
  styleUrls: ['./listar-diarista.component.css']
})
export class ListarDiaristaComponent implements OnInit {

  retorno: string;

  constructor(diaristaService: ListarDiaristaService) {
    diaristaService.getData().subscribe(
      retorno => {
        this.retorno = retorno;
      }
    )

  }

  ngOnInit() {
  }

}
