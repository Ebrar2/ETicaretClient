import { Component, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-basket-order-create-dialog',
  standalone: false,
  templateUrl: './basket-order-create-dialog.html',
  styleUrl: './basket-order-create-dialog.scss',
})
export class BasketOrderCreateDialog extends BaseDialog<BasketOrderCreateDialog> {
   constructor(dialofRef:MatDialogRef<BasketOrderCreateDialog>,@Inject(MAT_DIALOG_DATA) public data:BasketOrderCreateState){
    super(dialofRef)
   }
}
export enum BasketOrderCreateState
{
  Yes,No
}
