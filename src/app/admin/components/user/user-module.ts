import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from './user';
import { List } from './list/list';
import { Create } from './create/create';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DeleteModule } from '../../../directives/admin/delete-module';



@NgModule({
  declarations: [
    User,
    List,
    Create
  ],
  imports: [
    CommonModule,RouterModule.forChild([{path:"",component:User}]),
    MatPaginatorModule,MatTableModule,MatButtonModule,MatFormFieldModule,MatSidenavModule,DeleteModule
  ]
})
export class UserModule { }
