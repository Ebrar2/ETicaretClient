import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Role } from './role';
import { Router } from 'express';
import { RouterModule } from '@angular/router';
import { List } from './list/list';
import { Create } from './create/create';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DialogModule } from '@angular/cdk/dialog';
import { DeleteModule } from '../../../directives/admin/delete-module';



@NgModule({
  declarations: [
    Role,
    List,
    Create
  ],
  imports: [
    CommonModule,RouterModule.forChild([
      {path:"",component:Role}]),
      MatTableModule,MatSidenavModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatPaginatorModule,DialogModule
      ,DeleteModule
  ],
})
export class RoleModule { }
