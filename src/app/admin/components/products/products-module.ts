import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Products } from './products';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { Create } from './create/create';
import { List } from './list/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { Delete } from '../../../directives/admin/delete';

import { FileUplodModule } from '../../../services/common/file-uplod/file-uplod-module';
import { DialogModule } from '../../../dialogs/dialog-module';
import { MatDialog } from '@angular/material/dialog';

@NgModule({
  declarations: [
    Products,
    Create,
    List,
    Delete
  ],
  imports: [
    MatSidenavModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatTableModule,MatPaginatorModule,
    FileUplodModule,
    DialogModule,
    CommonModule,RouterModule.forChild(
      [{path:"",component:Products}]
    )
  ]
})
export class ProductsModule { }
