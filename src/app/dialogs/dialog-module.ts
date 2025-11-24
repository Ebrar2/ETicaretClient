import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialog } from './delete-dialog/delete-dialog';
import { FileUploadDialog } from './file-upload-dialog/file-upload-dialog';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    DeleteDialog,
    FileUploadDialog
  ],
  imports: [
    CommonModule,MatDialogModule,MatButtonModule
  ]
})
export class DialogModule { }
