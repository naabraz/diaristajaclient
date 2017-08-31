import { Component, OnInit, NgZone, ElementRef, ViewChild, AfterViewInit, Input, Output } from '@angular/core';
import { Http } from '@angular/http';
import { FormControl } from '@angular/forms';

import { MapsAPILoader } from '@agm/core';

import { Validator } from './../common/base/model/validator-model';
import { Endereco } from './../common/base/model/endereco-model';
import { Diarista } from './../common/base/model/diarista-model';

import { DiaristaService } from './diarista-cadastro.service';

import { MapComponent } from './../common/map/map.component';
import { RestricoesComponent } from 'app/restricoes/restricoes.component';

@Component({
  selector: 'diarista-cadastro',
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

  @ViewChild(RestricoesComponent) restricao;

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

    this.diarista.restricoes = this.restricao.restricoesSelecionadas;

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
        types: ["address"],
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          for (let indexPlace = 0; indexPlace <= place.address_components.length; indexPlace++) {
            if (place.address_components[indexPlace] !== undefined) {
              for (let indexTypes = 0; indexTypes <= place.address_components[indexPlace].types.length; indexTypes++) {
                switch (place.address_components[indexPlace].types[indexTypes]) {
                  case 'route':
                    this.diarista.endereco.endereco = place.address_components[indexPlace].long_name;
                    break;
                  case 'street_number':
                    this.diarista.endereco.numero = place.address_components[indexPlace].long_name;
                    break;
                  case 'administrative_area_level_2':
                    this.diarista.endereco.cidade = place.address_components[indexPlace].long_name;
                    break;
                  case 'administrative_area_level_1':
                    this.diarista.endereco.estado = place.address_components[indexPlace].long_name;
                    break;
                  case 'postal_code':
                    this.diarista.endereco.cep = place.address_components[indexPlace].long_name;
                }
              }
            }
          }

          this.diarista.endereco.latitude = place.geometry.location.lat();
          this.diarista.endereco.longitude = place.geometry.location.lng();
        });
      });
    });
  }
}
