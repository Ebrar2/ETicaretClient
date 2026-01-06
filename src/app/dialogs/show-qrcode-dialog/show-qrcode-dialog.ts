import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastr } from '../../services/ui/custom-toastr';
import { ProductService } from '../../services/common/models/product-service';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';
import { SpinnerTypeNames } from '../../base/base';

@Component({
  selector: 'app-show-qrcode-dialog',
  standalone: false,
  templateUrl: './show-qrcode-dialog.html',
  styleUrl: './show-qrcode-dialog.scss',
})
export class ShowQrcodeDialog extends BaseDialog<ShowQrcodeDialog> implements OnInit{
  constructor(dialogRef:MatDialogRef<ShowQrcodeDialog>,@Inject(MAT_DIALOG_DATA)public data:string,
  private spinner:NgxSpinnerService,
  private toastr:CustomToastr,
  private productService:ProductService,
  private domSanitizer:DomSanitizer,
  private cdref: ChangeDetectorRef
 )
  {
    super(dialogRef)
  }
  qrCodeUrl?:SafeHtml
 async ngOnInit():Promise<void> {
  this.spinner.show(SpinnerTypeNames.BallScaleMultiple)
    const qrCode:Blob=await this.productService.generateQRCode(this.data);
    const qrUrl:string=URL.createObjectURL(qrCode)
    this.qrCodeUrl= this.domSanitizer.bypassSecurityTrustUrl(qrUrl);
      this.cdref.detectChanges();

    this.spinner.hide(SpinnerTypeNames.BallScaleMultiple)

  }
   

}
