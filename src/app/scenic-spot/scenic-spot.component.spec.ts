import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenicSpotComponent } from './scenic-spot.component';

describe('ScenicSpotComponent', () => {
  let component: ScenicSpotComponent;
  let fixture: ComponentFixture<ScenicSpotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScenicSpotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenicSpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
