import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BikeAvailability } from '../models/bike-availability.model';
import { BikeShape } from '../models/bike-shape.model';
import { BikeStation } from '../models/bike-station.model';

@Injectable({
  providedIn: 'root'
})
export class BikeStationService {


  private api = environment.apiURL + 'Bike/';
  private cyclingApi = environment.apiURL + 'Cycling/Shape/';

  constructor(private http: HttpClient) { }

  /** 取得指定縣市的 Bike 租借站資料 */
  getBikeStation(city: string, top?: number) {
    let params: any = {
      $format: 'JSON'
    }
    if (top) {
      params['$top'] = top
    }
    return this.http.get<BikeStation[]>(this.api + city, { params: params });
  }

  /** 取得指定縣市的 Bike 即時車位資料 */
  getBikeStationAvailability(city: string, top?: number) {
    let params: any = {
      $format: 'JSON'
    }
    if (top) {
      params['$top'] = top
    }
    return this.http.get<BikeAvailability[]>(this.api + city, { params: params });
  }

  /** 取得指定縣市的 Bike 車道路網圖資資料 */
  getCyclingShape(city: string, top?: number) {
    let params: any = {
      $format: 'JSON'
    }
    if (top) {
      params['$top'] = top
    }
    return this.http.get<BikeShape[]>(this.cyclingApi + city, { params: params });
  }

  /** 取得附近的 Bike 租借站資料 */
  getBikeStationNearBy(position: { lat: number, lng: number }, distance = 500, keyword?: string, top?: number) {
    let params: any = {
      $format: 'JSON',

      $spatialFilter: `nearby(${position.lat}, ${position.lng}, ${distance})`
    }

    if (top) {
      params['$top'] = top
    }

    if (keyword) {
      params['$filter'] = `contains(StationName ,'${keyword}')`
    }

    return this.http.get<BikeStation[]>(this.api + 'Station/NearBy', { params: params });
  }

  /** 取得 Bike 即時車位資料 */
  getBikeAvailabilityNearBy(position: { lat: number, lng: number }, distance = 500, keyword?: string) {
    let params: any = {
      $format: 'JSON',
      $spatialFilter: `nearby(${position.lat}, ${position.lng}, ${distance})`
    }

    if (keyword) {
      params['$filter'] = `contains(StationUID ,'${keyword}')`;
    }

    return this.http.get<BikeAvailability[]>(this.api + 'Availability/NearBy', { params: params });
  }
}
