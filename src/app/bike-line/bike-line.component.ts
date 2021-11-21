import { BikeShape } from './../models/bike-shape.model';
import { BikeStationService } from './../services/bike-station.service';
import { DeviceDetectorService, DeviceType } from 'ngx-device-detector';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CitySelectorDialogComponent } from '../common/city-selector-dialog/city-selector-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BikeLineInfoComponent } from '../common/bike-line-info/bike-line-info.component';

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
      key: '1 公里以下', value: 'CyclingLength le 1000'
    },
    {
      key: '3 - 5公里', value: 'CyclingLength ge 3000 and CyclingLength le 5000'
    },
    {
      key: '5 公里以上', value: 'CyclingLength ge 5000'
    },
    {
      key: '5 - 10公里以下', value: 'CyclingLength ge 5000 and CyclingLength le 10000'
    },
    {
      key: '10 公里以上', value: 'CyclingLength ge 10000'
    }];

  orderOptions = [
    { key: '距離我最近', value: '' },
    { key: '騎乘距離由短至長', value: 'CyclingLength asc' },
    { key: '騎乘距離由長至短', value: 'CyclingLength desc' },
  ];


  DeviceType = DeviceType;
  /** 目前使用的 device 型態(desktop、mobile、tablet...etc) */
  currentDeviceType = '';

  /** 目前選取的城市 */
  // selectedCity = {} as { zhtw: string, en: string };
  selectedCity = { zhtw: '臺北市', en: 'Taipei' }
  /** 目前選到的距離 */
  selectedDistance = this.distanceOptions[0].value;
  /** 目前選取的排序方式 */
  selectedOrder = this.orderOptions[1].value;


  lstSearchResult: BikeShape[] = [];
  currentPage = 1;
  constructor(
    private snackBar: MatSnackBar,
    private bikeStationService: BikeStationService,
    private matDialog: MatDialog, private deviceDetectorService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.currentDeviceType = this.deviceDetectorService.getDeviceInfo().deviceType;

    this.search();
  }

  openCitySelector() {
    const config: MatDialogConfig = {
      data: this.selectedCity,
      width: '70vw',
      height: '60vh',
      disableClose: true
    };
    const ref = this.matDialog.open(CitySelectorDialogComponent, config);
    ref.afterClosed().subscribe(val => {
      this.selectedCity = val;
    });
  }

  openDialog(item: BikeShape) {

    const infoList: string[] = item.Geometry.replace('MULTILINESTRING ', '').replace(/\(+/gm, '').replace(/\)+/gm, '').split(',');

    // 起始點
    const start_lat = infoList[0].split(' ')[1];
    const start_lng = infoList[0].split(' ')[0];

    // 終點
    const end_lat = infoList[infoList.length - 1].split(' ')[1];
    const end_lng = infoList[infoList.length - 1].split(' ')[0];

    window.open(`https://www.google.com/maps/dir/${start_lat},${start_lng}/${end_lat},${end_lng}`, '_blank');

    //     <a
    //         * ngIf="currentSelectInfoWindow.ServiceStatus === 1"
    //     class="navigation"
    //     href = "https://www.google.com/maps/dir/?api=1&destination={{
    //     currentSelectInfoWindow?.StationPosition?.lat
    //   }
    // }, { { currentSelectInfoWindow?.StationPosition?.lng } } "
    // target = "_blank"
    //   > 開始導航 < /a
    //   >
    // const config: MatDialogConfig = {
    //   data: item.Geometry,
    //   width: '70vw',
    //   height: '70vh'
    // }
    // this.matDialog.open(BikeLineInfoComponent, config);
  }
  async search() {
    if (!this.selectedCity?.zhtw) {
      const ref = this.snackBar.open('請選擇城市');
      ref._dismissAfter(2500);
    } else {
      this.currentPage = 1;
      this.lstSearchResult = await this.bikeStationService.getCyclingShape(this.selectedCity.en, this.selectedDistance, this.selectedOrder);
    }

    // let service = new google.maps.DistanceMatrixService();
    // service.getDistanceMatrix(
    //   {
    //     origins: [{ lat: 25.038935, lng: 121.5018988 }],
    //     destinations: [{ lat: 25.04081, lng: 121.506566 }],
    //     travelMode: google.maps.TravelMode.BICYCLING,
    //     unitSystem: google.maps.UnitSystem.METRIC,
    //   }, function (response, status) {
    //     if (status !== google.maps.DistanceMatrixStatus.OK) {
    //       window.alert('Error was' + status);
    //     } else {
    //       console.log(response);
    //     }
    //   });
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
