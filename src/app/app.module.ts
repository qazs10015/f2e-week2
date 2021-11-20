import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { SharedModule } from './shared/shared.module';
import { BikeStationComponent } from './bike-station/bike-station.component';
import { ScenicSpotComponent } from './scenic-spot/scenic-spot.component';
import { BikeLineComponent } from './bike-line/bike-line.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { CitySelectorDialogComponent } from './common/city-selector-dialog/city-selector-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    BikeStationComponent,
    ScenicSpotComponent,
    BikeLineComponent,
    CitySelectorDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
  { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } }],
  bootstrap: [AppComponent]
})
export class AppModule { }
