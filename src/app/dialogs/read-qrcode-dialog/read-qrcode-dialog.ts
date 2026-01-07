import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';
import { CustomToastr, ToastrMessageTypes, ToastrPositions } from '../../services/ui/custom-toastr';
import { ProductService } from '../../services/common/models/product-service';
declare var $:any
@Component({
  selector: 'app-read-qrcode-dialog',
  standalone: false,
  templateUrl: './read-qrcode-dialog.html',
  styleUrl: './read-qrcode-dialog.scss',
})
export class ReadQrcodeDialog extends BaseDialog<ReadQrcodeDialog> implements OnInit,OnDestroy{
  constructor(dialogRef:MatDialogRef<ReadQrcodeDialog>,
    @Inject(MAT_DIALOG_DATA) public data:string,
    private toastr:CustomToastr,
    private productService:ProductService
  )
  {
    super(dialogRef)
  }
  ngOnDestroy(): void {
    this.scanner.stop();
  }
  ngOnInit(): void {
    this.scanner.start()
  }
  @ViewChild("scanner",{static:true}) scanner:NgxScannerQrcodeComponent;
  onEvent(event,stock:HTMLInputElement)
  {
      console.log(stock)
       const data=event[0].value
       if(data!=null && data!="")
       {
         const product=JSON.parse(data)  
         console.log(stock)
         $("#buttonClose").click();
         this.productService.changeProductStock(product.Id,parseInt(stock.value),()=>{
          this.toastr.message(product.Name+" ürünün stok bilgisi "+stock.value+" olarak güncellendi","Stok Bilgisi Güncellem",{
          messageType:ToastrMessageTypes.Success,
          position:ToastrPositions.TopRight
        })
         },(err)=>{
          this.toastr.message(product.Name+" ürünün stok bilgisi güncellenemedi!!","Stok Bilgisi Güncellem",{
          messageType:ToastrMessageTypes.Warning,
          position:ToastrPositions.TopRight
        })
         })
        
           this.scanner.stop()
       }
     
  }
}
