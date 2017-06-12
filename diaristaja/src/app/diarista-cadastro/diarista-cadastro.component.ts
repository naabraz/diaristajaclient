import { DiaristaService } from './diarista-cadastro.service';
import { Endereco } from './../common/base/endereco-model';
import { Diarista } from './../common/base/diarista-model';
import { MapComponent } from './../common/map/map.component';
import { Component, OnInit, NgZone, ElementRef, ViewChild, Input, Output } from '@angular/core';
import { Http } from '@angular/http';
import { FormControl } from '@angular/forms';

import { MapsAPILoader } from 'angular2-google-maps/core';

@Component({
  selector: 'app-diarista-cadastro',
  templateUrl: './diarista-cadastro.component.html',
  styleUrls: ['./diarista-cadastro.component.css'],
      providers: [DiaristaService]

})

export class DiaristaCadastroComponent implements OnInit {

  public diarista: Diarista;

  public searchControl: FormControl;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private http: Http,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private diaristaService: DiaristaService) { }

  ngOnInit() {
    this.searchControl = new FormControl();
    this.loadPlaces();

    this.diarista = new Diarista();
    this.diarista.endereco = new Endereco();
  }


  saveDiarista(): void {
    this.diaristaService.saveDiarista(this.diarista)
      .subscribe(
      response => {
        
        console.log(response);
      },
      error => {
        console.log(error);
      }
      );
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
          console.log(place);
          //set latitude, longitude and zoom
          this.diarista.endereco.latitude = place.geometry.location.lat();
          this.diarista.endereco.longitude = place.geometry.location.lng();
        });
      });
    });
  }
}
