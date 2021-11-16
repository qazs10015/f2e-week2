import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BikeLineComponent } from './bike-line/bike-line.component';
import { BikeStationComponent } from './bike-station/bike-station.component';
import { ScenicSpotComponent } from './scenic-spot/scenic-spot.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'bikeStation' },
  { path: 'bikeStation', component: BikeStationComponent },
  { path: 'bikeLine', component: BikeLineComponent },
  { path: 'scenicSpot', component: ScenicSpotComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
