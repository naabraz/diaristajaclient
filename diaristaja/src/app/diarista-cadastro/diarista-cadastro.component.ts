import { Component, OnInit, NgZone, ElementRef, ViewChild, Input, Output } from '@angular/core';
import { Http } from '@angular/http';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from 'angular2-google-maps/core';

import { Validator } from './../common/base/validator-model';
import { DiaristaService } from './diarista-cadastro.service';
import { Endereco } from './../common/base/endereco-model';
import { Diarista } from './../common/base/diarista-model';
import { MapComponent } from './../common/map/map.component';

@Component({
  selector: 'app-diarista-cadastro',
  templateUrl: './diarista-cadastro.component.html',
  styleUrls: ['./diarista-cadastro.component.css'],
  providers: [DiaristaService]

})

export class DiaristaCadastroComponent implements OnInit {

  public diarista: Diarista;
  public searchControl: FormControl;
  public messageResponseSuccess: String[];
  public messageResponseError: String[];
  public success: Boolean;
  public error: Boolean;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private http: Http,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private diaristaService: DiaristaService) { }

  ngOnInit() {
    this.success = false;
    this.error = false;

    this.messageResponseSuccess = [];
    this.messageResponseError = [];

    this.searchControl = new FormControl();
    this.loadPlaces();

    this.diarista = new Diarista();
    this.diarista.endereco = new Endereco();
  }


  saveDiarista(): void {

    this.success = false;
    this.error = false;

    this.messageResponseSuccess = [];
    this.messageResponseError = [];

    this.diaristaService.saveDiarista(this.diarista)
      .subscribe(
      response => {
        if (response.status === 1) {
          this.success = true;
          this.messageResponseSuccess.push("Diarista cadastrada com sucesso");
        } else {
          this.validate(response.validators);
        }
      },
      error => console.log(error)
      );
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    
    // Redirecionar para pagina de login
  }

  private validate(validators) {
    this.error = true;
    for (var i = 0; i < validators.length; i++) {
      this.messageResponseError.push(validators[i].message);
    }
  }

  private loadPlaces() {
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          console.log(place);
          this.diarista.endereco.latitude = place.geometry.location.lat();
          this.diarista.endereco.longitude = place.geometry.location.lng();
        });
      });
    });
  }
}
