import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

const materialModules = [MatAutocompleteModule, MatInputModule]
const thirdModules = [GoogleMapsModule]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    ...materialModules,
    ...thirdModules
  ]
})
export class SharedModule { }
