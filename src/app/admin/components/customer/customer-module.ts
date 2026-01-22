import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from './customer';
import { RouterModule } from '@angular/router';
import path from 'path';
import { List } from './list/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    Customer,
    List
  ],
  imports: [
    CommonModule,RouterModule.forChild(
      [{path:"",component:Customer}]
    )  , MatPaginatorModule,MatTableModule,MatButtonModule,MatFormFieldModule,MatSidenavModule,
    FormsModule,MatInputModule,MatButtonModule
  ]
})
export class CustomerModule { }
