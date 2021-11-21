import { ChangeDetectorRef, Component, Inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceType, DeviceDetectorService } from 'ngx-device-detector';
import { cityGroupList } from '../city.config';

@Component({
  selector: 'app-city-selector-dialog',
  templateUrl: './city-selector-dialog.component.html',
  styleUrls: ['./city-selector-dialog.component.scss']
})
export class CitySelectorDialogComponent implements OnInit {

  @ViewChildren('rdb') rdb!: QueryList<MatRadioButton>;

  /** 目前選取的城市 */
  selectedCity: any = {};
  /** 所有城市的設定檔 */
  cityGroupList = cityGroupList;
  DeviceType = DeviceType;
  /** 目前使用的 device 型態(desktop、mobile、tablet...etc) */
  currentDeviceType = '';
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private snackBar: MatSnackBar,
    private ref: MatDialogRef<CitySelectorDialogComponent>, private deviceDetectorService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.currentDeviceType = this.deviceDetectorService.getDeviceInfo().deviceType;
    this.ref.afterOpened().subscribe(() => {
      const btnIdx = this.rdb.toArray().findIndex(item => item.value.en == this.data.en);
      this.rdb.get(btnIdx)!.checked = true;
      this.rdb.notifyOnChanges();
      this.selectedCity = this.rdb.get(btnIdx)?.value;
    });

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
