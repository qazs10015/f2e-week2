import { environment } from 'src/environments/environment';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocationService } from './../../services/location.service';
import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap, delay } from 'rxjs/operators';

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
  googleMapOptions = {} as google.maps.MapOptions;

  polyPath: google.maps.LatLngLiteral[] = [];

  /** 圖資 */
  polyOptions = {} as google.maps.PolylineOptions;

  /** 地圖縮放比例 */
  zoom = 17;

  startPosition = {} as google.maps.LatLngLiteral;
  endPosition = {} as google.maps.LatLngLiteral;

  constructor(
    private locationService: LocationService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private httpClient: HttpClient) {
    this.apiLoaded = this.httpClient.jsonp(environment.googleMap, 'callback')
      .pipe(
        tap(() => {
          this.loadGoogleMapConfig();
        }),
        map(() => true),
        catchError(() => of(false)),
      );


  }
  async ngOnInit() {


    this.polyPath = this.data;
    // 範例：MULTILINESTRING ((121.508405511567 25.0378847666251,121.508504751296 25.0382006816341))
    // 移除掉不需要的字元
    const infoList: string[] = this.data.replace('MULTILINESTRING ', '').replace(/\(+/gm, '').replace(/\)+/gm, '').split(',');

    const start_lat = infoList[0].split(' ')[1];
    const start_lng = infoList[0].split(' ')[0];

    const end_lat = infoList[infoList.length - 1].split(' ')[1];
    const end_lng = infoList[infoList.length - 1].split(' ')[0];

    this.startPosition = { lat: Number(start_lat), lng: Number(start_lng) };
    this.endPosition = { lat: Number(end_lat), lng: Number(end_lng) };

    this.polyPath = infoList.map(info => {
      const coordinate = info.split(' ');
      return { lat: Number(coordinate[1]), lng: Number(coordinate[0]) };
    });


  }

  private loadGoogleMapConfig() {
    this.markerOptions = { draggable: false, animation: google.maps.Animation.DROP };

    this.googleMapOptions = {
      disableDefaultUI: true,
      clickableIcons: true,
      disableDoubleClickZoom: true,
      draggable: true,
      zoomControl: true,
    }

    this.polyOptions = {
      strokeColor: '#f25c54',
      strokeOpacity: 1,
      strokeWeight: 7,
    };
  }

}
