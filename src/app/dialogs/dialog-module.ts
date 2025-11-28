import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialog } from './delete-dialog/delete-dialog';
import { FileUploadDialog } from './file-upload-dialog/file-upload-dialog';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SelectProductImages } from './select-product-images/select-product-images';
import { FileUplodModule } from '../services/common/file-uplod/file-uplod-module';



@NgModule({
  declarations: [
    DeleteDialog,
    FileUploadDialog,
     SelectProductImages
  ],
  imports: [
    CommonModule,MatDialogModule,MatButtonModule,FileUplodModule
  ]
})
export class DialogModule { }
