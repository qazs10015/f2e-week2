
export interface BikeStation {
  StationUID: string;
  StationID: string;
  AuthorityID: string;
  StationName: NameType;
  StationPosition: PointType;
  StationAddress: NameType;
  BikesCapacity: number;
  ServiceType: number;
  SrcUpdateTime: Date;
  UpdateTime: Date;
}


export interface NameType {
  Zh_tw: string;
  En: string;
}

export interface PointType {
  PositionLon: number;
  PositionLat: number;
  GeoHash: string;
}
