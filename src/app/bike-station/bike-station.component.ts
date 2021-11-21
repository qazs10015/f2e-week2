

import { BikeStationService } from './../services/bike-station.service';
import { LocationService } from './../services/location.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, pairwise, switchMap, tap } from 'rxjs/operators';
import { BikeStation } from '../models/bike-station.model';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { BikeAvailability } from '../models/bike-availability.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


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

  apiLoaded: Observable<boolean>;

  /** 暫停營運或停止營運的 icon */
  disableIcon = 'assets/icons/grayMarker.png';

  /** 自己位置的 icon */
  private selfIcon = 'assets/icons/marker.png';


  /** Bike 租借站的 marker */
  markerOptions = {} as google.maps.MarkerOptions;


  /** 自己位置的 marker */
  currentMarkerPositionOption = {} as google.maps.MarkerOptions;

  /** 所有 Bike 租借站的經緯度 */
  markerPositions: google.maps.LatLngLiteral[] = [];

  /** 目前位置的經緯度 */
  currentPosition: google.maps.LatLngLiteral = { lat: 0, lng: 0 };

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;


  /** 關鍵字 */
  keyword = '';

  googleMapOptions = {} as google.maps.MapOptions;


  /** 圖資 */
  polyOptions = {} as google.maps.PolylineOptions;


  /** 地圖縮放比例 */
  zoom = 15;

  lstBikeStationInfo: customInfoWindow[] = [];

  currentSelectInfoWindow: customInfoWindow = {} as customInfoWindow;

  // polyPath: google.maps.LatLngLiteral[] = [
  //   { lat: 25.03280092118552, lng: 121.56348748779168 },
  //   { lat: 25.03587797931996, lng: 121.56351157458673 },
  //   { lat: 25.03583432131525, lng: 121.56543846794476 },
  //   { lat: 25.033019138809674, lng: 121.56546250540032 },
  //   { lat: 25.033062791203154, lng: 121.56201826717597 },
  // ];

  constructor(
    private locationService: LocationService,
    private snackBar: MatSnackBar,
    private bikeStationService: BikeStationService,
    private httpClient: HttpClient) {

    this.apiLoaded = this.httpClient.jsonp(environment.googleMap, 'callback')
      .pipe(
        tap(() => { this.loadGoogleMapConfig(); }),
        map(() => true),
        catchError(() => of(false)),
      );
  }

  async ngOnInit() {
    this.currentPosition = await this.locationService.getPosition();
  }

  async search() {
    // 每次搜尋前重新抓一次目前座標
    this.currentPosition = await this.locationService.getPosition();

    // 空值就搜尋附近指定範圍的所有資料
    const _keyWord = this.keyword ?? '';

    // 取出附近租借站資料
    let obs = forkJoin([this.bikeStationService.getBikeStationNearBy(this.currentPosition, _keyWord), this.bikeStationService.getBikeAvailabilityNearBy(this.currentPosition)]);

    obs.subscribe((val: any[]) => {
      const stations = val[0] as BikeStation[];
      const availability = val[1] as BikeAvailability[];

      if (stations.length === 0) {
        const ref = this.snackBar.open('附近目前沒有可以租借車輛的租借站');
        ref._dismissAfter(2500)
      } else {
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
        }))[0]);
      }
    });
  }

  openInfoWindow(marker: MapMarker, position: google.maps.LatLngLiteral) {

    this.currentSelectInfoWindow = this.lstBikeStationInfo.find(item =>
      item.StationPosition.lat === position.lat &&
      item.StationPosition.lng === position.lng)!;

    this.infoWindow.open(marker);
  }

  private loadGoogleMapConfig() {
    this.markerOptions = { draggable: false, animation: google.maps.Animation.DROP };

    this.currentMarkerPositionOption = {
      title: '你的位置',
      draggable: false,
      icon: this.selfIcon,
      animation: google.maps.Animation.BOUNCE,
      clickable: true
    };

    this.googleMapOptions = {
      disableDefaultUI: true,
      clickableIcons: true,
      disableDoubleClickZoom: true,
      draggable: true,
      zoomControl: true,
    };

    this.polyOptions = {
      strokeColor: '#40809d',
      strokeOpacity: 1,
      strokeWeight: 10,
      icons: [
        {
          icon: {
            path: 3,
          },
          offset: '100%',
        },
      ],
    }
  }

}
