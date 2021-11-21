import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LocationService } from 'src/app/services/location.service';


interface customInfoWindow {
  StationUID: string;
  StationName: string;
  ServiceStatus: number;
  AvailableRentBikes: number;
  AvailableReturnBikes: number;
  StationPosition: google.maps.LatLngLiteral;
}

@Component({
  selector: 'app-custom-google-map',
  templateUrl: './custom-google-map.component.html',
  styleUrls: ['./custom-google-map.component.scss']
})
export class CustomGoogleMapComponent implements OnInit {

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  /** 暫停營運或停止營運的 icon */
  disableIcon = 'assets/icons/grayMarker.png';

  /** 自己位置的 icon */
  private selfIcon = 'assets/icons/marker.png';


  /** Bike 租借站的 marker */
  markerOptions: google.maps.MarkerOptions = { draggable: false, animation: google.maps.Animation.DROP, };



  /** 自己位置的 marker */
  currentMarkerPositionOption: google.maps.MarkerOptions = {
    title: '你的位置',
    draggable: false,
    icon: this.selfIcon,
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
  polyPath: google.maps.LatLngLiteral[] = [
    { lat: 25.03280092118552, lng: 121.56348748779168 },
    { lat: 25.03587797931996, lng: 121.56351157458673 },
    { lat: 25.03583432131525, lng: 121.56543846794476 },
    { lat: 25.033019138809674, lng: 121.56546250540032 },
    { lat: 25.033062791203154, lng: 121.56201826717597 },
  ];

  /** 地圖縮放比例 */
  zoom = 15;

  lstBikeStationInfo: customInfoWindow[] = [];

  currentSelectInfoWindow: customInfoWindow = {} as customInfoWindow;

  constructor(private locationService: LocationService,) {

  }

  async ngOnInit() {
    this.currentPosition = await this.locationService.getPosition();
  }

  openInfoWindow(marker: MapMarker, position: google.maps.LatLngLiteral) {

    this.currentSelectInfoWindow = this.lstBikeStationInfo.find(item =>
      item.StationPosition.lat === position.lat &&
      item.StationPosition.lng === position.lng)!;

    this.infoWindow.open(marker);
  }
}
