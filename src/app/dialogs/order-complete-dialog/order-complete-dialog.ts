import { Component, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-order-complete-dialog',
  standalone: false,
  templateUrl: './order-complete-dialog.html',
  styleUrl: './order-complete-dialog.scss',
})
export class OrderCompleteDialog extends BaseDialog<OrderCompleteDialog>{
   constructor(dialogRef:MatDialogRef<OrderCompleteDialog>,@Inject(MAT_DIALOG_DATA) public data:OrderCompleteState)
   {
    super(dialogRef)
   }
}
export enum OrderCompleteState
{
  Yes,No
}