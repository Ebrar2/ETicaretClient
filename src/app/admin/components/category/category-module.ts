import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from './category';
import { List } from './list/list';
import { Create } from './create/create';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DialogModule } from '../../../dialogs/dialog-module';
import { RouterModule } from '@angular/router';
import { DeleteModule } from '../../../directives/admin/delete-module';




@NgModule({
  declarations: [
    Category,
    List,
    Create
  ],
  imports: [
    MatSidenavModule,MatInputModule,MatButtonModule,MatTableModule,MatPaginatorModule,
    DialogModule,
    CommonModule,RouterModule.forChild(
      [{path:"",component:Category}]
    ),
    DeleteModule
  ]
})
export class CategoryModule { }
