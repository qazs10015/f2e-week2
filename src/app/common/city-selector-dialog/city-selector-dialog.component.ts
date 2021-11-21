import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceType, DeviceDetectorService } from 'ngx-device-detector';
import { cityGroupList } from '../city.config';

@Component({
  selector: 'app-city-selector-dialog',
  templateUrl: './city-selector-dialog.component.html',
  styleUrls: ['./city-selector-dialog.component.scss']
})
export class CitySelectorDialogComponent implements OnInit {

  /** 目前選取的城市 */
  selectedCity: any = {};
  /** 所有城市的設定檔 */
  cityGroupList = cityGroupList;
  DeviceType = DeviceType;
  /** 目前使用的 device 型態(desktop、mobile、tablet...etc) */
  currentDeviceType = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private snackBar: MatSnackBar,
    private ref: MatDialogRef<CitySelectorDialogComponent>, private deviceDetectorService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.currentDeviceType = this.deviceDetectorService.getDeviceInfo().deviceType;
    this.selectedCity = this.data;
  }

  close() {
    if (!this.selectedCity?.zhtw) {
      const ref = this.snackBar.open('請選擇城市');
      ref._dismissAfter(2500);
    } else {
      this.ref.close(this.selectedCity);
    }
  }

}
