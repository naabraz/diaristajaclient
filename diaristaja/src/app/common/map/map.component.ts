import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { FormControl } from "@angular/forms";

import { iMap } from './../../common/base/imap.interface';
import {} from '@types/googlemaps'; 

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  arrMap: iMap[] = [];

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }


  ngOnInit() {
    this.zoom = 16;
    this.latitude = -23.445658;
    this.longitude = -46.735411;

    //create search FormControl
    this.searchControl = new FormControl();

    this.populaLocais();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
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

  private populaLocais() {
    this.arrMap.push({ lat: -23.445471, lng: -46.735454 })
    this.arrMap.push({ lat: -23.446916, lng: -46.735552 })
    this.arrMap.push({ lat: -23.445590, lng: -46.736602 })
    this.arrMap.push({ lat: -23.527837, lng: -46.692308 })
    this.arrMap.push({ lat: -23.527985, lng: -46.691890 })
  }

}
