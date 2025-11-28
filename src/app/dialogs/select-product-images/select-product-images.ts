import { Component, Inject, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUplodOption } from '../../services/common/file-uplod/file-uplod';
import { identity } from 'rxjs';

@Component({
  selector: 'app-show-product-images',
  standalone: false,
  templateUrl: './select-product-images.html',
  styleUrl: './select-product-images.scss',
})
export class SelectProductImages extends BaseDialog<SelectProductImages> {
 
   constructor(dialogRef:MatDialogRef<SelectProductImages>,@Inject(MAT_DIALOG_DATA) public data:string)
   {
    super(dialogRef)

    this.options.query="id="+data;
   }
    @Output() options:Partial<FileUplodOption>={
    accept:'.jpeg,.png,.jpeg,.gif',
    controller:"product",
    action:"upload",
    isAdmin:true,
    explanation:"Ürün resimlerini seçiniz"
  }
}
