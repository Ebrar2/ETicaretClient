import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dashboard } from './dashboard';
import { RouterModule } from '@angular/router';
import { MatLabel } from '@angular/material/form-field';



@NgModule({
  declarations: [
    Dashboard
  ],
  imports: [
    CommonModule, RouterModule.forChild([
        { path: "", component: Dashboard }
    ]),
    MatLabel
]
})
export class DashboardModule { }
