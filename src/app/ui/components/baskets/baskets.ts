import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Base, SpinnerTypeNames } from '../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListBasketItems } from '../../../contracts/baskets/list_basketItems';
import { BasketService } from '../../../services/common/models/basket-service';
import { OrderService } from '../../../services/common/models/order-service';
import { createOverlayRef } from '@angular/cdk/overlay';
import { CreateOrder } from '../../../contracts/orders/create_order';
import { CustomToastr, ToastrMessageTypes, ToastrPositions } from '../../../services/ui/custom-toastr';
import { Router } from '@angular/router';
import { Dialog } from '../../../services/common/dialog';

import { BasketItemDeleteDialog, BasketItemDeleteState } from '../../../dialogs/basket-item-delete-dialog/basket-item-delete-dialog';
import { BasketOrderCreateDialog, BasketOrderCreateState } from '../../../dialogs/basket-order-create-dialog/basket-order-create-dialog';
declare var $:any;
declare var bootstrap:any;
@Component({
  selector: 'app-baskets',
  standalone: false,
  templateUrl: './baskets.html',
  styleUrl: './baskets.scss',
})
export class Baskets extends Base implements OnInit{
  constructor(spinner:NgxSpinnerService,private basketService:BasketService,private changeD:ChangeDetectorRef,
    private orderService:OrderService,private toastrService:CustomToastr,private router:Router,
    private dialogService:Dialog
  )
  {
    super(spinner)
  }
  totalPrice:number=0;
  basketItems:ListBasketItems[]=[];
 async ngOnInit() {
     this.basketItems=await this.basketService.getBasketItems()
     this.changeTotalPrice()
  }
  changeTotalPrice()
  {
    this.totalPrice=0;
   this.basketItems.forEach(element => {
      this.totalPrice+=element.price*element.quantity
     });
         this.changeD.detectChanges()

  }
 async changeQuantity(event,basketItemId:string)
  {
    this.showSpinner(SpinnerTypeNames.SquareJellyBox)
    let newQuantity=event.target.value;
    let updatedQuantity=this.basketItems.filter(b=>b.basketItemId==basketItemId)[0]
    updatedQuantity.quantity=newQuantity;
    this.changeTotalPrice()
    await this.basketService.updateQuantityBasketItem({
      quantity:newQuantity,
      basketItemId:basketItemId
    })
    this.hideSpinner(SpinnerTypeNames.SquareJellyBox)
  }
 async deleteBasketItem(basketItemId:string)
  {
    this.dialogService.openDialog({
          compenent:BasketItemDeleteDialog,
          data:BasketItemDeleteState.Yes,
          afterClosed:async()=>{
             this.showSpinner(SpinnerTypeNames.SquareJellyBox)
             await this.basketService.deleteBasketItem(basketItemId);
             this.basketItems=this.basketItems.filter(b=>b.basketItemId!=basketItemId);
             this.changeTotalPrice()
             $("."+basketItemId).fadeOut(500)
             this.hideSpinner(SpinnerTypeNames.SquareJellyBox)
          }})
    
   
  }
  async createOrder()
  {
   
     this.dialogService.openDialog({
     compenent:BasketOrderCreateDialog,
     data:BasketOrderCreateState.Yes,
     afterClosed:async()=>{
       this.showSpinner(SpinnerTypeNames.BallScaleMultiple)
       let order = new CreateOrder();
       order.address = "Ankara",
       order.description = "Açıklama";
       order.totalPrice=this.totalPrice
       await this.orderService.createOrder(order);
       this.hideSpinner(SpinnerTypeNames.BallScaleMultiple)
       this.toastrService.message("Siparişiniz Oluşturuldu", "Sipariş", {
         messageType: ToastrMessageTypes.Success,
         position: ToastrPositions.TopRight
       })
    
       $("#basketModal").modal("hide");
       $('body').removeClass('modal-open');
       $('.modal-backdrop').remove();

       this.router.navigate(["/"])
     }
   

     })
  }
}
