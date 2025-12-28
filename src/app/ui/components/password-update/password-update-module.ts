import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordUpdate } from './password-update';
import { RouterModule } from '@angular/router';
import path from 'path';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PasswordUpdate
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path:"",component:PasswordUpdate}]),ReactiveFormsModule
  ]
})
export class PasswordUpdateModule { }
