import { Component, OnInit } from '@angular/core';

import { iMap } from './../../common/imap.interface';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  arrMap: iMap[] = [];

  constructor() { }

  ngOnInit() {
    this.arrMap.push({ lat: -23.445471, lng: -46.735454 })
    this.arrMap.push({ lat: -23.446916, lng: -46.735552 })
    this.arrMap.push({ lat: -23.445590, lng: -46.736602 })
  }

}
