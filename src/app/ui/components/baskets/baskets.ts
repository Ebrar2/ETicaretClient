import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Base, SpinnerTypeNames } from '../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListBasketItems } from '../../../contracts/baskets/list_basketItems';
import { BasketService } from '../../../services/common/models/basket-service';
declare var $:any;
@Component({
  selector: 'app-baskets',
  standalone: false,
  templateUrl: './baskets.html',
  styleUrl: './baskets.scss',
})
export class Baskets extends Base implements OnInit{
  constructor(spinner:NgxSpinnerService,private basketService:BasketService,private changeD:ChangeDetectorRef)
  {
    super(spinner)
  }
  basketItems:ListBasketItems[]=[];
 async ngOnInit() {
     this.basketItems=await this.basketService.getBasketItems()
     this.changeD.detectChanges()
  }
 async changeQuantity(event,basketItemId:string)
  {
    this.showSpinner(SpinnerTypeNames.SquareJellyBox)
    let newQuantity=event.target.value;
    await this.basketService.updateQuantityBasketItem({
      quantity:newQuantity,
      basketItemId:basketItemId
    })
    this.hideSpinner(SpinnerTypeNames.SquareJellyBox)
  }
 async deleteBasketItem(basketItemId:string)
  {
    this.showSpinner(SpinnerTypeNames.SquareJellyBox)
    console.log(basketItemId)
    await this.basketService.deleteBasketItem(basketItemId);
    $("."+basketItemId).fadeOut(500)
    this.hideSpinner(SpinnerTypeNames.SquareJellyBox)
  }
}
