import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeLineComponent } from './bike-line.component';

describe('BikeLineComponent', () => {
  let component: BikeLineComponent;
  let fixture: ComponentFixture<BikeLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BikeLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
