import { TestBed } from '@angular/core/testing';

import { BikeStationService } from './bike-station.service';

describe('BikeStationService', () => {
  let service: BikeStationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BikeStationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
