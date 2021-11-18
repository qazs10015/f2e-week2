

import { BikeStationService } from './../services/bike-station.service';
import { LocationService } from './../services/location.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, pairwise, switchMap } from 'rxjs/operators';
import { BikeStation } from '../models/bike-station.model';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { BikeAvailability } from '../models/bike-availability.model';

interface customInfoWindow {
  StationUID: string;
  StationName: string;
  ServiceStatus: number;
  AvailableRentBikes: number;
  AvailableReturnBikes: number;
  StationPosition: google.maps.LatLngLiteral;
}

@Component({
  selector: 'app-bike-station',
  templateUrl: './bike-station.component.html',
  styleUrls: ['./bike-station.component.scss']
})
export class BikeStationComponent implements OnInit {

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  /** 關鍵字 */
  keyword = '';

  /** 自動完成的選項 */
  autoCompleteOptions: string[] = ['附近 Youbike 租借站'];

  /** Bike 租借站的 marker */
  markerOptions: google.maps.MarkerOptions = { draggable: false, animation: google.maps.Animation.DROP, };



  /** 自己位置的 marker */
  currentMarkerPositionOption: google.maps.MarkerOptions = {
    title: '你的位置',
    draggable: false,
    icon: '../../assets/icons/marker.png',
    animation: google.maps.Animation.BOUNCE,
    clickable: true
  }

  /** 目前位置的經緯度 */
  currentPosition: google.maps.LatLngLiteral = { lat: 0, lng: 0 };


  /** 所有 Bike 租借站的經緯度 */
  markerPositions: google.maps.LatLngLiteral[] = [];


  /** googleMap 的參數 */
  googleMapOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
    clickableIcons: true,
    disableDoubleClickZoom: true,
    draggable: true,
    zoomControl: true,
  };

  /** 圖資 */
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

  private lstBikeStationInfo: customInfoWindow[] = [];

  currentSelectInfoWindow: customInfoWindow = {} as customInfoWindow;

  polyPath: google.maps.LatLngLiteral[] = [
    { lat: 25.03280092118552, lng: 121.56348748779168 },
    { lat: 25.03587797931996, lng: 121.56351157458673 },
    { lat: 25.03583432131525, lng: 121.56543846794476 },
    { lat: 25.033019138809674, lng: 121.56546250540032 },
    { lat: 25.033062791203154, lng: 121.56201826717597 },
  ];

  /** 地圖縮放比例 */
  zoom = 16;


  constructor(private locationService: LocationService, private bikeStationService: BikeStationService) { }

  async ngOnInit() {
    this.currentPosition = await this.locationService.getPosition();
  }

  async search() {
    // 每次搜尋前重新抓一次目前座標
    this.currentPosition = await this.locationService.getPosition();

    let obs;

    // 空值或是模糊符合預設選項的字串就搜附近的
    const _keyWord = (this.autoCompleteOptions[0].replace(/\ /gm, '').indexOf(this.keyword) > -1) ? '' : this.keyword;

    // 取出附近租借站資料
    obs = forkJoin([this.bikeStationService.getBikeStationNearBy(this.currentPosition, _keyWord), this.bikeStationService.getBikeAvailabilityNearBy(this.currentPosition)]);

    obs.subscribe((val: any[]) => {
      const stations = val[0] as BikeStation[];
      const availability = val[1] as BikeAvailability[];
      this.markerPositions =
        stations.map(item => ({ lat: item.StationPosition.PositionLat, lng: item.StationPosition.PositionLon }));


      // 重新組合租借站資料
      this.lstBikeStationInfo = stations.map(station => availability.filter(val => val.StationUID === station.StationUID).map(val => ({
        StationUID: val.StationUID,
        StationName: station.StationName.Zh_tw,
        ServiceStatus: val.ServiceStatus,
        AvailableRentBikes: val.AvailableRentBikes,
        AvailableReturnBikes: val.AvailableReturnBikes,
        StationPosition: { lat: station.StationPosition.PositionLat, lng: station.StationPosition.PositionLon }
      }))[0])
    });
  }

  openInfoWindow(marker: MapMarker, position: google.maps.LatLngLiteral) {

    this.currentSelectInfoWindow = this.lstBikeStationInfo.find(item =>
      item.StationPosition.lat === position.lat &&
      item.StationPosition.lng === position.lng)!;

    this.infoWindow.open(marker);
  }

}
