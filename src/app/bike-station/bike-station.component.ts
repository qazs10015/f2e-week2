

import { BikeStationService } from './../services/bike-station.service';
import { LocationService } from './../services/location.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BikeStation } from '../models/bike-station.model';

@Component({
  selector: 'app-bike-station',
  templateUrl: './bike-station.component.html',
  styleUrls: ['./bike-station.component.scss']
})
export class BikeStationComponent implements OnInit {

  autoCompleteOptions: string[] = ['附近 Youbike 租借站'];

  keyword = '';
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  currentPosition = { lat: 0, lng: 0 } as google.maps.LatLngLiteral;
  polyPath: google.maps.LatLngLiteral[] = [
    { lat: 25.03280092118552, lng: 121.56348748779168 },
    { lat: 25.03587797931996, lng: 121.56351157458673 },
    { lat: 25.03583432131525, lng: 121.56543846794476 },
    { lat: 25.033019138809674, lng: 121.56546250540032 },
    { lat: 25.033062791203154, lng: 121.56201826717597 },
  ];
  center: google.maps.LatLngLiteral = {
    lat: 25.0336962,
    lng: 121.5643673,
  };
  markerPositions: google.maps.LatLngLiteral[] = [];
  polyOptions: google.maps.PolylineOptions = {
    strokeColor: '#40809d',
    strokeOpacity: 1,
    strokeWeight: 10,
    icons: [
      {
        icon: {
          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        },
        offset: '100%',
      },
    ],
  };
  //
  zoom = 17;
  options: google.maps.MapOptions = {
    disableDefaultUI: true,
    backgroundColor: '#126df5',
    clickableIcons: false,
    disableDoubleClickZoom: true,
    draggable: true,
    zoomControl: true,
  };

  constructor(private locationService: LocationService, private bikeStationService: BikeStationService) { }

  async ngOnInit() {
    this.currentPosition = await this.locationService.getPosition();
    debugger
  }

  async search() {
    // 每次搜尋前重新抓一次目前座標
    this.currentPosition = await this.locationService.getPosition();

    let obs: Observable<BikeStation[]>;

    // 空值或是模糊符合預設選項的字串就搜附近的
    if (this.autoCompleteOptions[0].replace(/\ /gm, '').indexOf(this.keyword) > -1 || this.keyword === '') {
      obs = this.bikeStationService.getBikeStationNearBy(this.currentPosition);
    } else {
      obs = this.bikeStationService.getBikeStationNearBy(this.currentPosition, this.keyword)
    }

    obs.subscribe(val => {
      this.markerPositions =
        val.map(item => ({ lat: item.StationPosition.PositionLat, lng: item.StationPosition.PositionLon }))
    });
  }


}
