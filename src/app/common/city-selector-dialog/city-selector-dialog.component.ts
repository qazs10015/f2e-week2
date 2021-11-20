import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DeviceType, DeviceDetectorService } from 'ngx-device-detector';
import { cityGroupList } from '../city.config';

@Component({
  selector: 'app-city-selector-dialog',
  templateUrl: './city-selector-dialog.component.html',
  styleUrls: ['./city-selector-dialog.component.scss']
})
export class CitySelectorDialogComponent implements OnInit {

  selectedCity: any = {};
  cityGroupList = cityGroupList;
  DeviceType = DeviceType;
  currentDeviceType = '';
  constructor(private ref: MatDialogRef<CitySelectorDialogComponent>, private deviceDetectorService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.currentDeviceType = this.deviceDetectorService.getDeviceInfo().deviceType;
  }

  close() {
    this.ref.close(this.selectedCity);
  }

}
