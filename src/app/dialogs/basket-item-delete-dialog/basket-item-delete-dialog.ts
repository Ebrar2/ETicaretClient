import { Component, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-basket-item-delete-dialog',
  standalone: false,
  templateUrl: './basket-item-delete-dialog.html',
  styleUrl: './basket-item-delete-dialog.scss',
})
export class BasketItemDeleteDialog extends BaseDialog<BasketItemDeleteDialog> {
  constructor(dialogRef:MatDialogRef<BasketItemDeleteDialog>,@Inject(MAT_DIALOG_DATA) public data:BasketItemDeleteState){
    super(dialogRef)
  }
}
export enum BasketItemDeleteState
{
  Yes,No
}
