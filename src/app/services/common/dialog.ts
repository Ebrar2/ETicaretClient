import { Injectable } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root',
})
export class Dialog {
constructor(private dialog:MatDialog)
{

}
   
  openDialog(dialogOptions:Partial< DialogParameter>): void {
        const dialogRef = this.dialog.open(dialogOptions.compenent, {
          width:dialogOptions.options?.width,
          height:dialogOptions.options?.heigt,
          position:dialogOptions.options?.position,
          maxWidth: 'none',
          data:dialogOptions.data,
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result == dialogOptions.data)
            dialogOptions.afterClosed();
        });
    }
}
export class DialogParameter
{
  compenent:ComponentType<any>;
  afterClosed:()=>void;
  options:Partial<DialogOption>;
  data:any;
}
export class DialogOption
{
  width?:string= '250px';
  heigt?:string;
  position?:DialogPosition;

}