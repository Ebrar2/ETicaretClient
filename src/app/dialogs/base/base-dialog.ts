import { MatDialogRef } from "@angular/material/dialog";

export class BaseDialog<T> {
    constructor(private dialogRef:MatDialogRef<T>)
    {

    }
     close()
    {
      this.dialogRef.close();
    }
}