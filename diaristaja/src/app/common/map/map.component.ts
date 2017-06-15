import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import { FormControl } from "@angular/forms";

import { MapsAPILoader } from '@agm/core';

import { MapService, DiaristaRetrieveListType } from './map.service';

import { IDiarista } from './../base/interface/idiarista.interface';
import { IMap } from './../../common/base/interface/imap.interface';

import { } from '@types/googlemaps';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  diaristas: IDiarista[];
  diaristasLocalizacao: IMap [] = [];
  
  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private http: Http,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  ngOnInit() {
    this.getListaDiaristas();

    this.setMapConfig();
    //create search FormControl
    this.searchControl = new FormControl();
    //set current position
    this.setCurrentPosition();
    //load Places Autocomplete
    this.loadPlaces();
  }

  private setMapConfig() {
    this.zoom = 16;
    this.latitude = -23.445658;
    this.longitude = -46.735411;
  }

  private getListaDiaristas() {
    let mapService = new MapService(this.http);
    mapService.getDiaristas().subscribe((data: DiaristaRetrieveListType) => { this.diaristas = <IDiarista[]>data.resultList, this.populaMapa() },
      error => console.log(error),
      () => console.log('Diaristas-Master -> Get Diaristas Complete ==> :1', this.diaristas));
  }

  private populaMapa() {
    for (let idxDiarista = 0; idxDiarista < this.diaristas.length; idxDiarista++) {
      this.diaristasLocalizacao.push({ "latitude": Number(this.diaristas[idxDiarista].endereco.latitude), "longitude": Number(this.diaristas[idxDiarista].endereco.longitude) });
    }
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
          this.zoom = 16;
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 16;
      });
    }
  }

}
