import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListOrderDetails } from '../../contracts/orders/list_order_details';
import { OrderService } from '../../services/common/models/order-service';

@Component({
  selector: 'app-order-details-dialog',
  standalone: false,
  templateUrl: './order-details-dialog.html',
  styleUrl: './order-details-dialog.scss',
})
export class OrderDetailsDialog extends BaseDialog<OrderDetailsDialog> implements OnInit{
    constructor(dialogRef:MatDialogRef<OrderDetailsDialog>,@Inject(MAT_DIALOG_DATA) public data:string,
    private orderService:OrderService,
  private changeR:ChangeDetectorRef ){
      super(dialogRef)
    }
  async ngOnInit() {
     let list_order_details:ListOrderDetails=await this.orderService.getOrderDetails(this.data);
    this.address=list_order_details.address
    this.description=list_order_details.description
    this.totalPrice=list_order_details.totalPrice
     this.dataSource=list_order_details.basketItems
   
   this.changeR.detectChanges()
   }
    displayedColumns: string[] = ['productName', 'productPrice', 'productQuantity','productTotalPrice'];
    dataSource:any;
    totalPrice:number;
    address:string;
    description:string
    clickedRows = new Set<any>();
    orderCompleted()
    {
      
    }
}


