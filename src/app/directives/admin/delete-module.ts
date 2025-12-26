import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Delete } from './delete';




@NgModule({
  declarations: [Delete],
  imports: [
    CommonModule
  ],
  exports:[Delete]
})
export class DeleteModule { }
