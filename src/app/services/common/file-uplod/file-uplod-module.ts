import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUplod } from './file-uplod';
import { NgxFileDropModule } from 'ngx-file-drop';



@NgModule({
  declarations: [
    FileUplod
  ],
  imports: [
    CommonModule,
    NgxFileDropModule
  ],
  exports:[FileUplod]
})
export class FileUplodModule { }
