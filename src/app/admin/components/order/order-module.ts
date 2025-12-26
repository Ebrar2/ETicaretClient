import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from './order';
import { RouterModule } from '@angular/router';
import { List } from './list/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DeleteModule } from '../../../directives/admin/delete-module';



@NgModule({
  declarations: [
    Order,
    List
  ],
  imports: [
    CommonModule,RouterModule.forChild([
      {path:"",component:Order}
    ]),
    MatSidenavModule,
    MatPaginatorModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatTableModule,DeleteModule
  ]
})
export class OrderModule { }
