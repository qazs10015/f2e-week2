import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeLineInfoComponent } from './bike-line-info.component';

describe('BikeLineInfoComponent', () => {
  let component: BikeLineInfoComponent;
  let fixture: ComponentFixture<BikeLineInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BikeLineInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeLineInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
