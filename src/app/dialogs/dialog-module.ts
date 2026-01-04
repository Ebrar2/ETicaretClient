import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialog } from './delete-dialog/delete-dialog';
import { FileUploadDialog } from './file-upload-dialog/file-upload-dialog';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SelectProductImages } from './select-product-images/select-product-images';
import { FileUplodModule } from '../services/common/file-uplod/file-uplod-module';
import {MatCardModule} from '@angular/material/card';
import { BasketItemDeleteDialog } from './basket-item-delete-dialog/basket-item-delete-dialog';
import { BasketOrderCreateDialog } from './basket-order-create-dialog/basket-order-create-dialog';
import { OrderDetailsDialog } from './order-details-dialog/order-details-dialog';
import { MatTableModule } from '@angular/material/table';
import { OrderCompleteDialog } from './order-complete-dialog/order-complete-dialog';
import { AuthorizeMenuDialog } from './authorize-menu-dialog/authorize-menu-dialog';
import {MatBadgeModule} from '@angular/material/badge';
import {MatListModule} from '@angular/material/list';
import { AuthorizeUserDialog } from './authorize-user-dialog/authorize-user-dialog';
@NgModule({
  declarations: [
    DeleteDialog,
    FileUploadDialog,
     SelectProductImages,
     BasketItemDeleteDialog,
     BasketOrderCreateDialog,
     OrderDetailsDialog,
     OrderCompleteDialog,
     AuthorizeMenuDialog,
     AuthorizeUserDialog
  ],
  imports: [
    CommonModule,
    MatDialogModule,MatButtonModule,MatCardModule,MatTableModule,
    FileUplodModule, MatBadgeModule,MatListModule
  ]
})
export class DialogModule { }
