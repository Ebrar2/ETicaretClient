import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from './user';
import { List } from './list/list';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DeleteModule } from '../../../directives/admin/delete-module';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    User,
    List
  ],
  imports: [
    CommonModule,RouterModule.forChild([{path:"",component:User}]),
    MatPaginatorModule,MatTableModule,MatButtonModule,MatFormFieldModule,MatSidenavModule,DeleteModule,
    FormsModule,MatInputModule,MatButtonModule
  ]
})
export class UserModule { }
