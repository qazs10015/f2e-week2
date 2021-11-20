import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
const materialModules = [MatAutocompleteModule, MatInputModule, MatSnackBarModule]
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
