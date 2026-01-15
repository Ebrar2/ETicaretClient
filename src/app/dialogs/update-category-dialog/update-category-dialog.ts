import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../services/common/models/category-service';
import { Alertify, MessageType, Position } from '../../services/admin/alertify';
import { NgxSpinnerService } from 'ngx-spinner';
import { error } from 'console';
import { SpinnerTypeNames } from '../../base/base';

@Component({
  selector: 'app-update-category-dialog',
  standalone: false,
  templateUrl: './update-category-dialog.html',
  styleUrl: './update-category-dialog.scss',
})
export class UpdateCategoryDialog extends BaseDialog<UpdateCategoryDialog>{
  constructor(dialogRef: MatDialogRef<UpdateCategoryDialog>, @Inject(MAT_DIALOG_DATA) public data: {id:string,name:string},
    private categoryService: CategoryService,
    private alert: Alertify,
    private spinner: NgxSpinnerService) {
    super(dialogRef)
  }

  async update(newName: string) {
    this.spinner.show(SpinnerTypeNames.BallScaleMultiple)
    await this.categoryService.update(newName, this.data.id, () => {
      this.spinner.hide(SpinnerTypeNames.BallScaleMultiple)
      this.alert.message("Kategori Başrıyla Güncellendi", {
        messageType: MessageType.Success,
        position: Position.TopRight,
        dismissOther: true
      })
    },
      (error) => {
        this.spinner.hide(SpinnerTypeNames.BallScaleMultiple)
        this.alert.message("Kategori Güncelleme Başarısız", {
          messageType: MessageType.Error,
          position: Position.TopRight,
          dismissOther: true
        })
      })
  }
}
