import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocationService } from './../../services/location.service';
import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-bike-line-info',
  templateUrl: './bike-line-info.component.html',
  styleUrls: ['./bike-line-info.component.scss']
})
export class BikeLineInfoComponent implements OnInit {
  apiLoaded: Observable<boolean>;
  /** 起點的 icon */
  startIcon = 'assets/icons/start.png';
  /** 終點的 icon */
  endIcon = 'assets/icons/end.png';
  /** 目前位置的經緯度 */
  currentPosition: google.maps.LatLngLiteral = { lat: 0, lng: 0 };

  /** Bike 租借站的 marker */
  markerOptions: any;


  /** googleMap 的參數 */
  googleMapOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
    clickableIcons: true,
    disableDoubleClickZoom: true,
    draggable: true,
    zoomControl: true,
  };

  polyPath: google.maps.LatLngLiteral[] = [
    { lat: 25.03280092118552, lng: 121.56348748779168 },
    { lat: 25.03587797931996, lng: 121.56351157458673 },
    { lat: 25.03583432131525, lng: 121.56543846794476 },
    { lat: 25.033019138809674, lng: 121.56546250540032 },
    { lat: 25.033062791203154, lng: 121.56201826717597 },
  ];

  /** 圖資 */
  polyOptions: any;


  /** 地圖縮放比例 */
  zoom = 15;

  startPosition = {} as google.maps.LatLngLiteral;
  endPosition = {} as google.maps.LatLngLiteral;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private httpClient: HttpClient) {
    this.apiLoaded = this.httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyA4Hp5d-evNHngr2CzZOvToMWgZFgPUvIE', 'callback')
      .pipe(
        map(() => true),
        tap(() => {
          this.readyGoogleMapConfig();
        }),
        catchError(() => of(false)),
      );


  }
  ngOnInit(): void {


    this.polyPath = this.data;
    // 範例：MULTILINESTRING ((121.508405511567 25.0378847666251,121.508504751296 25.0382006816341))
    // 移除掉不需要的字元
    const infoList: string[] = this.data.replace('MULTILINESTRING ', '').replace(/\(+/gm, '').replace(/\)+/gm, '').split(',');
    debugger
    const start_lat = infoList[0].split(' ')[0];
    const start_lng = infoList[0].split(' ')[1];

    const end_lat = infoList[infoList.length - 1].split(' ')[0];
    const end_lng = infoList[infoList.length - 1].split(' ')[1];

    this.startPosition = { lat: Number(start_lat), lng: Number(start_lng) };
    this.endPosition = { lat: Number(end_lat), lng: Number(end_lng) };
  }

  private readyGoogleMapConfig() {
    this.markerOptions = { draggable: false, animation: google.maps.Animation.DROP };
    this.polyOptions = {
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
  }

}
