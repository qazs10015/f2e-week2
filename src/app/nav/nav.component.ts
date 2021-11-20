import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService, DeviceType } from 'ngx-device-detector';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {


  DeviceType = DeviceType;
  currentDeviceType = '';

  constructor(private deviceDetectorService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.currentDeviceType = this.deviceDetectorService.getDeviceInfo().deviceType;
  }

}
