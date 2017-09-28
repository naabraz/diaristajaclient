import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import { FormControl } from '@angular/forms';

import { MapsAPILoader } from '@agm/core';

import { MapService, DiaristaRetrieveListType } from './map.service';

import { IDiarista } from './../base/interface/idiarista.interface';
import { IMap } from './../../common/base/interface/imap.interface';
import { FiltroLocalizacao } from './../base/model/filtro-localizacao-model';

import { } from '@types/googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public latlngBounds;
  public success: Boolean;
  public error: Boolean;
  public messageResponseSuccess: String[];
  public messageResponseError: String[];

  diaristas: IDiarista[];
  diaristasLocalizacao: IMap[] = [];
  diaristaDetalhe: IDiarista;
  diaristaContratada: string;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private http: Http,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getListaDiaristas();

    this.setMapConfig();

    this.searchControl = new FormControl();

    this.loadPlaces();
  }

  private setMapConfig() {
    this.zoom = 12;
    this.latitude = -23.528170;
    this.longitude = -46.699886;
  }

  private getListaDiaristas() {

    const mapService = new MapService(this.http);

    mapService.getDiaristas().subscribe((data: DiaristaRetrieveListType) => {
      this.diaristas = <IDiarista[]>data.resultList; this.populaMapa();
    },
      error => console.log(error),
      () => console.log('Diaristas-Master -> Get Diaristas Complete ==> :1', this.diaristas));
  }

  private openModal(paramDiarista) {
    this.diaristaDetalhe = paramDiarista;
  }

  private populaMapa() {
    this.diaristasLocalizacao = [];
    for (let idxDiarista = 0; idxDiarista < this.diaristas.length; idxDiarista++) {
      this.diaristasLocalizacao.push({
        'id': this.diaristas[idxDiarista].id,
        'nome': this.diaristas[idxDiarista].nome,
        'latitude': Number(this.diaristas[idxDiarista].endereco.latitude),
        'longitude': Number(this.diaristas[idxDiarista].endereco.longitude),
        'valorMaximoDiaria': this.diaristas[idxDiarista].valorMaximoDiaria,
        'valorMinimoDiaria': this.diaristas[idxDiarista].valorMinimoDiaria,
        'endereco': this.diaristas[idxDiarista].endereco
      });
    }

    this.mapsAPILoader.load().then(() => {
      this.latlngBounds = new window['google'].maps.LatLngBounds();
      this.diaristasLocalizacao.forEach((location) => {
        this.latlngBounds.extend(new window['google'].maps.LatLng(location.latitude, location.longitude));
      });
    });
  }

  public contrataDiarista(diaristaNome) {
    this.diaristaContratada = diaristaNome;
  }

  private loadPlaces() {
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          const filtroLocalizacao = new FiltroLocalizacao(
            place.geometry.location.lat().toString(),
            place.geometry.location.lng().toString(), null);

          this.searchDiaristasByLocalization(filtroLocalizacao);
        });
      });
    });
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 16;
      });
    } else {
      this.zoom = 9;
    }
  }

  private searchDiaristasByLocalization(filtroLocalizacao: FiltroLocalizacao): void {
    this.success = false;
    this.error = false;
    this.messageResponseSuccess = [];
    this.messageResponseError = [];
    this.diaristas = [];

    const mapService = new MapService(this.http);

    mapService.getDiaristasByLocalization(filtroLocalizacao)
      .subscribe(
      response => {
        if (response.status === 1) {

          this.diaristas = response.resultList;
          this.zoom = 17;

          if (this.diaristas.length === 0) {
            this.latitude = Number(filtroLocalizacao.latitude);
            this.longitude = Number(filtroLocalizacao.longitude);
          } else {
            this.populaMapa();
          }

        } else {
          this.validate(response.validators);
        }
      },
      error => console.log(error)
      );
  }

  private validate(validators) {
    this.error = true;
    for (let i = 0; i < validators.length; i++) {
      this.messageResponseError.push(validators[i].message);
    }
  }

}
