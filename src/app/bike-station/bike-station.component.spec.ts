import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeStationComponent } from './bike-station.component';

describe('BikeStationComponent', () => {
  let component: BikeStationComponent;
  let fixture: ComponentFixture<BikeStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BikeStationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
