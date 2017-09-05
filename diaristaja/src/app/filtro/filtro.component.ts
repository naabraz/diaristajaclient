import { FiltroAvancado } from './../common/base/model/filtro-avancado-model';
import { Diarista } from './../common/base/model/diarista-model';
import { IDiarista } from './../common/base/interface/idiarista.interface';
import { Component, OnInit, NgZone, ElementRef, ViewChild, Input, Output } from '@angular/core';
import { Http } from '@angular/http';
import { FormControl } from '@angular/forms';

import { MapsAPILoader } from '@agm/core';

import { IFiltro } from './../common/base/interface/ifiltro.interface';
import { MapComponent } from './../common/map/map.component';
import { RestricoesComponent } from 'app/restricoes/restricoes.component';
import { FiltroService, FiltroAvancadoRetrieveListType } from "app/filtro/filtro.service";

@Component({
  selector: 'filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css'],
  providers: [FiltroService]
})
export class FiltroComponent implements OnInit {

  public latitude: number;
  public longitude: number;

  data: Date;
  metragem: number;
  cep: number;
  numero: number;
  endereco: string;
  valorMaximoDiaria: number;
  raio: number = 5;
  restricoesId: number[] = [];

  filtroResultado: Diarista[];
  filtroAvancado: FiltroAvancado = new FiltroAvancado();

  public searchControl: FormControl;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  @ViewChild(RestricoesComponent) restricao;

  constructor(
    private http: Http,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private filtroService: FiltroService) { }

  ngOnInit() {
    this.searchControl = new FormControl();
    
    this.loadPlaces();

    this.filtroResultado = [];
  }

  limpa(): void {
    this.restricao.restricoesSelecionadas = [];
    this.restricoesId = [];
    this.latitude = null;
    this.longitude = null;
    this.valorMaximoDiaria = null;
    this.filtroResultado = [];
  }

  busca(): void {  
    for (let auxRestricoes = 0;  auxRestricoes < this.restricao.restricoesSelecionadas.length; auxRestricoes++) {
      this.restricoesId.push(this.restricao.restricoesSelecionadas[auxRestricoes].id);
    }

    this.filtroAvancado.latitude = this.latitude;
    this.filtroAvancado.longitude = this.longitude; 
    this.filtroAvancado.raio = this.raio;
    this.filtroAvancado.valor = this.valorMaximoDiaria; 
    this.filtroAvancado.restricoes = this.restricoesId;

    let filtroAvancadoService = new FiltroService(this.http);
    
    filtroAvancadoService.searchFilter(this.filtroAvancado).subscribe((data: FiltroAvancadoRetrieveListType) => { this.filtroResultado = <Diarista[]>data.resultList },
    error => console.log(error),
    () => console.log('FiltroAvancado-Master -> Search Complete ==> :1', this.filtroResultado));

  }

  private loadPlaces() {
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
        });
      });
    });
  }

}
