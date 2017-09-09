import { Component, OnInit, NgZone, ElementRef, ViewChild, Input, Output } from '@angular/core';
import { Http } from '@angular/http';
import { FormControl } from '@angular/forms';

import { MapsAPILoader } from '@agm/core';

import { IFiltro } from './../common/base/interface/ifiltro.interface';
import { IDiarista } from './../common/base/interface/idiarista.interface';

import { MapComponent } from './../common/map/map.component';

import { Diarista } from './../common/base/model/diarista-model';
import { Restricao } from './../common/base/model/restricao-model';
import { FiltroAvancado } from './../common/base/model/filtro-avancado-model';

import { FiltroService, FiltroAvancadoRetrieveListType } from "app/filtro/filtro.service";

@Component({
  selector: 'filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css'],
  providers: [FiltroService]
})
export class FiltroComponent implements OnInit {

  public data: Date;
  public metragem: number;
  public endereco: string;
  public latitude: number;
  public longitude: number;
  public raio: number = 5;
  public valorMaximoDiaria: number;
  public restricoesId: number[] = [];

  public filtroResultado: Diarista[];
  public filtroAvancado: FiltroAvancado = new FiltroAvancado();
  
  public restricoesSelecionadas: Restricao[];
  
  public searchControl: FormControl;

  @ViewChild("search")
  public searchElementRef: ElementRef;

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

  public receiveRestricoes($event) {
    this.restricoesSelecionadas = $event;
    this.restricoesId = [];
  }

  public busca(): void {
    if (this.restricoesSelecionadas != null || undefined) {
      for (let auxRestricoes = 0;  auxRestricoes < this.restricoesSelecionadas.length; auxRestricoes++) {
        if (!this.restricoesId.includes(this.restricoesSelecionadas[auxRestricoes].id)) {
          this.restricoesId.push(this.restricoesSelecionadas[auxRestricoes].id);
        }
      }
    }

    this.filtroAvancado.latitude = this.latitude;
    this.filtroAvancado.longitude = this.longitude; 
    this.filtroAvancado.raio = this.raio;
    this.filtroAvancado.valor = this.valorMaximoDiaria; 
    this.filtroAvancado.restricoesId = this.restricoesId;

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
