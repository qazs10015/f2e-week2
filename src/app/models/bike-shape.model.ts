export interface BikeShape {
  RouteName: string;
  AuthorityName?: string;
  CityCode: string;
  City: string;
  Town?: string;
  RoadSectionStart?: string;
  RoadSectionEnd?: string;
  Direction?: string;
  CyclingLength?: number;
  UpdateTime: Date;
  Geometry: string;
  FinishedTime?: string;
}

