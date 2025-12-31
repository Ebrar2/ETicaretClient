import { Component, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-authorize-menu-dialog',
  standalone: false,
  templateUrl: './authorize-menu-dialog.html',
  styleUrl: './authorize-menu-dialog.scss',
})
export class AuthorizeMenuDialog extends BaseDialog<AuthorizeMenuDialog> {
   constructor(dialogRef:MatDialogRef<AuthorizeMenuDialog>,@Inject(MAT_DIALOG_DATA)public data:{code:string,name:string}){
    super(dialogRef)
   }
}
export enum AuthorizeMenuDialogState
{
  Yes,No
}