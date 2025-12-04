import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { Register } from './register';
import { ReactiveFormsModule } from '@angular/forms';
;



@NgModule({
  declarations: [
    Register
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
    {  path:'',component:Register}
    ]),ReactiveFormsModule
  ]
})
export class RegisterModule { }
