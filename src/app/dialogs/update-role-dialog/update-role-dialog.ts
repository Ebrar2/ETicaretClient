import { Component, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleService } from '../../services/common/models/role-service';
import { Alertify, MessageType, Position } from '../../services/admin/alertify';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerTypeNames } from '../../base/base';

@Component({
  selector: 'app-update-role-dialog',
  standalone: false,
  templateUrl: './update-role-dialog.html',
  styleUrl: './update-role-dialog.scss',
})
export class UpdateRoleDialog extends BaseDialog<UpdateRoleDialog>{
   constructor(dialogRef: MatDialogRef<UpdateRoleDialog>, @Inject(MAT_DIALOG_DATA) public data: {id:string,name:string},
    private roleService: RoleService,
    private alert: Alertify,
    private spinner: NgxSpinnerService) {
    super(dialogRef)
  }

  async update(newName: string) {
    this.spinner.show(SpinnerTypeNames.BallScaleMultiple)
    await this.roleService.updateRole (this.data.id,newName, () => {
      this.spinner.hide(SpinnerTypeNames.BallScaleMultiple)
      this.alert.message("Rol Başarıyla Güncellendi", {
        messageType: MessageType.Success,
        position: Position.TopRight,
        dismissOther: true
      })
    },
      () => {
        this.spinner.hide(SpinnerTypeNames.BallScaleMultiple)
        this.alert.message("Rol Güncelleme Başarısız", {
          messageType: MessageType.Error,
          position: Position.TopRight,
          dismissOther: true
        })
      })
  }
}
