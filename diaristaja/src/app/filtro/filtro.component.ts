import { MapComponent } from './../common/map/map.component';
import { Component, OnInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { FormControl } from '@angular/forms';

import { MapsAPILoader } from 'angular2-google-maps/core';

@Component({
  selector: 'filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public mapComponent: MapComponent;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private http: Http,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  ngOnInit() {
    this.searchControl = new FormControl();
    
    this.loadPlaces();
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
