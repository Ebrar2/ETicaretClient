import { Component, Output } from '@angular/core';
import { ProductService } from '../../../../services/common/models/product-service';
import { CreateProduct } from '../../../../contracts/create_product';
import { parse } from 'path';
import { Base, SpinnerTypeNames } from '../../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { Alertify, MessageType, Position } from '../../../../services/admin/alertify';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create',
  standalone: false,
  templateUrl: './create.html',
  styleUrl: './create.scss',
})
export class Create extends Base {

  constructor(spinner:NgxSpinnerService,private productService:ProductService,private alertify:Alertify)
  {
    super(spinner)
  }
 @Output() createdProduct: EventEmitter<CreateProduct> = new EventEmitter();
 create(name:HTMLInputElement,price:HTMLInputElement,stock:HTMLInputElement)
  {
     this.showSpinner(SpinnerTypeNames.BallScaleMultiple)
     const createProduct:CreateProduct=new CreateProduct();
     createProduct.name=name.value;
     createProduct.price=parseFloat(price.value);
     createProduct.stock=parseInt(stock.value);
       this.productService.create(createProduct,()=>{
        this.hideSpinner(SpinnerTypeNames.BallScaleMultiple)
        this.alertify.message("Ürün Ekleme Başarılı",{
          messageType:MessageType.Success,
          position:Position.TopRight,
          dismissOther:true
        })
        this.createdProduct.emit(createProduct)
       },(errorMessage)=>{
        this.alertify.message(errorMessage,{
          messageType:MessageType.Error,
          position:Position.TopRight,
          dismissOther:true
        });
       })
  }
}
