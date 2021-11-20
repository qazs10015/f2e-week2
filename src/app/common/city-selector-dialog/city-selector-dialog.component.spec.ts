import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitySelectorDialogComponent } from './city-selector-dialog.component';

describe('CitySelectorDialogComponent', () => {
  let component: CitySelectorDialogComponent;
  let fixture: ComponentFixture<CitySelectorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitySelectorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitySelectorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
