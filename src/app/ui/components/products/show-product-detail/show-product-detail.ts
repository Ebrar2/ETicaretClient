import { Component, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../../services/common/models/product-service';
import { Base, SpinnerTypeNames } from '../../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { GetProductDetails } from '../../../../contracts/products/get_product_details';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from '../../../../services/common/models/basket-service';
import { CustomToastr, ToastrMessageTypes, ToastrPositions } from '../../../../services/ui/custom-toastr';

@Component({
  selector: 'app-show-product-detail',
  standalone: false,
  templateUrl: './show-product-detail.html',
  styleUrl: './show-product-detail.scss',
})
export class ShowProductDetail extends Base implements OnInit {
    constructor(private productService:ProductService,spinner:NgxSpinnerService,
      private activatedRoute:ActivatedRoute,
      private basketService:BasketService,
      private customToastrService:CustomToastr
    )
    {
        super(spinner)
    }
    id:string
    product=signal<GetProductDetails>(null);
 async ngOnInit()  {
          this.showSpinner(SpinnerTypeNames.SquareJellyBox)

     this.activatedRoute.params.subscribe(async params=>{
      this.id=params["id"]
       await this.productService.getProductDetails(this.id).then((data)=>{
         this.hideSpinner(SpinnerTypeNames.SquareJellyBox)
          this.product.set(data)
       }
       
      )
     })
  }
   async addBasketItem()
    {
      this.showSpinner(SpinnerTypeNames.SquareJellyBox);
     await  this.basketService.addBasketItem({
        quantity:1,
        productId:this.id
      }).then(()=>{
        
        this.hideSpinner(SpinnerTypeNames.SquareJellyBox)
        this.customToastrService.message("Ürün sepetinize eklendi","Sepete eklendi",{
          messageType:ToastrMessageTypes.Info,
          position:ToastrPositions.TopRight
        })
      });
    }

}
