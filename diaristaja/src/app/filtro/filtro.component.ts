import { Diarista } from './../common/base/model/diarista-model';
import { IDiarista } from './../common/base/interface/idiarista.interface';
import { Component, OnInit, NgZone, ElementRef, ViewChild, Input, Output } from '@angular/core';
import { Http } from '@angular/http';
import { FormControl } from '@angular/forms';

import { MapsAPILoader } from '@agm/core';

import { IFiltro } from './../common/base/interface/ifiltro.interface';
import { MapComponent } from './../common/map/map.component';
import { RestricoesComponent } from 'app/restricoes/restricoes.component';
import { FiltroService } from "app/filtro/filtro.service";

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
  valor: number;
  raio: number = 5;
  restricoesId: number[] = [];

  filtroResultado: Diarista;

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

    this.filtroResultado = new Diarista();
  }

  limpa(): void {
    this.restricao.restricoesSelecionadas = [];
  }

  busca(): void {  
    for (let auxRestricoes = 0;  auxRestricoes < this.restricao.restricoesSelecionadas.length; auxRestricoes++) {
      this.restricoesId.push(this.restricao.restricoesSelecionadas[auxRestricoes].id);
    }

    this.filtroService.searchFilter(this.latitude, this.longitude, this.valor, this.raio, this.restricoesId);
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
