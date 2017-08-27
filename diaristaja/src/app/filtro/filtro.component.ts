import { Diarista } from './../common/base/model/diarista-model';
import { IDiarista } from './../common/base/interface/idiarista.interface';
import { Component, OnInit, NgZone, ElementRef, ViewChild, Input, Output } from '@angular/core';
import { Http } from '@angular/http';
import { FormControl } from '@angular/forms';

import { MapsAPILoader } from '@agm/core';

import { IFiltro } from './../common/base/interface/ifiltro.interface';
import { MapComponent } from './../common/map/map.component';

@Component({
  selector: 'filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {

  public latitude: number;
  public longitude: number;

  data: Date;
  metragem: number;
  cep: number;
  numero: number;
  endereco: string;
 
  filtroResultado: Diarista;

  public searchControl: FormControl;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private http: Http,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  ngOnInit() {
    this.searchControl = new FormControl();
    
    this.loadPlaces();

    this.filtroResultado = new Diarista();

  }

  private showResult(paramEndereco) {
    this.filtroResultado.nome = 'Gabriela';
    this.filtroResultado.endereco = {id: null, uuid: null, referencia: null, cidade: 'Sao Paulo', estado: 'SP', cep: '1887788', latitude: -122222, longitude: -12333, endereco: 'Rua dos Alcatrazes', numero: '189'};
    this.filtroResultado.valorMaximoDiaria = 100;
    this.filtroResultado.valorMinimoDiaria = 50;
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
