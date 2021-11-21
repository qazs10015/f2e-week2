import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxPaginationModule } from 'ngx-pagination';
const materialModules = [MatAutocompleteModule, MatInputModule, MatSnackBarModule, MatDialogModule, MatRadioModule, MatSelectModule, MatExpansionModule]
const thirdModules = [GoogleMapsModule, NgxPaginationModule]

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
