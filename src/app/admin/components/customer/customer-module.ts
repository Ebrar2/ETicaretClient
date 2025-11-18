import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from './customer';
import { RouterModule } from '@angular/router';
import path from 'path';



@NgModule({
  declarations: [
    Customer
  ],
  imports: [
    CommonModule,RouterModule.forChild(
      [{path:"",component:Customer}]
    )
  ]
})
export class CustomerModule { }
