import { ChangeDetectorRef, Component, Inject, OnInit, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUplodOption } from '../../services/common/file-uplod/file-uplod';
import { identity } from 'rxjs';
import { ProductService } from '../../services/common/models/product-service';
import { ListProductImage } from '../../contracts/list_product_image';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerTypeNames } from '../../base/base';
import { Dialog } from '../../services/common/dialog';
import { DeleteDialog, DeleteState } from '../delete-dialog/delete-dialog';
declare var $:any;
@Component({
  selector: 'app-show-product-images',
  standalone: false,
  templateUrl: './select-product-images.html',
  styleUrl: './select-product-images.scss',
})
export class SelectProductImages extends BaseDialog<SelectProductImages> implements OnInit{
 
  images!:ListProductImage[];
  
 
   constructor(dialogRef:MatDialogRef<SelectProductImages>,@Inject(MAT_DIALOG_DATA) public data:string,
     private productService:ProductService,
    private cd:ChangeDetectorRef,
    private spinner:NgxSpinnerService,
  private dialog:Dialog)
   {
    super(dialogRef)
   }
    @Output() options:Partial<FileUplodOption>
  async ngOnInit() {
    this.spinner.show(SpinnerTypeNames.BallScaleMultiple);
     this.options={
    accept:'.jpeg,.png,.jpeg,.gif',
    controller:"product",
    action:"upload",
    isAdmin:true,
    explanation:"Ürün resimlerini seçiniz",
    query:"id="+this.data
  }
  
      this.images= await this.productService.readProductImages(this.data,()=>this.spinner.hide(SpinnerTypeNames.BallScaleMultiple));
      this.cd.detectChanges();
   
  }
 async imageDelete(imageId:string,event:any)
  {

    this.dialog.openDialog( {
      compenent:DeleteDialog,
      data:DeleteState.Yes,
      afterClosed:async()=>{
    this.spinner.show(SpinnerTypeNames.BallScaleMultiple)

        const card = $(event.target).closest('.product-image-card');
            await this.productService.deleteProductImage(this.data,imageId,()=>{
              this.spinner.hide(SpinnerTypeNames.BallScaleMultiple)
                  card.fadeOut(900)
            })
      }
    })
   

    
          
  }

}
