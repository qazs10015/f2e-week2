import { DeviceDetectorService, DeviceType } from 'ngx-device-detector';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CitySelectorDialogComponent } from '../common/city-selector-dialog/city-selector-dialog.component';

@Component({
  selector: 'app-bike-line',
  templateUrl: './bike-line.component.html',
  styleUrls: ['./bike-line.component.scss']
})
export class BikeLineComponent implements OnInit {

  /** 路線長度
   *  key：選項名稱，value：配合 OData 查詢語法
   *  ODdata 語法 https://motc-ptx-api-documentation.gitbook.io/motc-ptx-api-documentation/api-te-se/odata
   */
  distanceOptions = [
    {
      key: '1 公里以下', value: 'le 1000'
    },
    {
      key: '3 - 5公里', value: 'ge 3000 and le 5000'
    },
    {
      key: '5 公里以上', value: 'ge 5000'
    },
    {
      key: '5 - 10公里以下', value: 'ge 5000 and le 10000'
    },
    {
      key: '10 公里以上', value: 'ge 10000'
    }];

  orderOptions: any[] = [
    { key: '距離我最近', value: '' },
    { key: '騎乘距離由短至長', value: 'desc' },
    { key: '騎乘距離由長至短', value: 'asc' },
  ];

  currentSelectedCity: any = null;

  DeviceType = DeviceType;
  currentDeviceType = '';

  constructor(private matDialog: MatDialog, private deviceDetectorService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.currentDeviceType = this.deviceDetectorService.getDeviceInfo().deviceType;
  }

  openCitySelector() {
    const config: MatDialogConfig = {
      width: '70vw',
      height: '80vh',
      disableClose: true
    };
    const ref = this.matDialog.open(CitySelectorDialogComponent, config);
    ref.afterClosed().subscribe(val => {
      this.currentSelectedCity = val;
    });
  }


  private degreesToRadians(degrees: number) {
    return degrees * Math.PI / 180;
  }

  private distanceInKmBetweenEarthCoordinates(coordinate1: google.maps.LatLngLiteral, coordinate2: google.maps.LatLngLiteral) {
    var earthRadiusKm = 6371;

    var dLat = this.degreesToRadians(coordinate2.lat - coordinate1.lat);
    var dLon = this.degreesToRadians(coordinate2.lng - coordinate1.lng);

    const lat1 = this.degreesToRadians(coordinate1.lat);
    const lat2 = this.degreesToRadians(coordinate2.lat);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
  }

}
