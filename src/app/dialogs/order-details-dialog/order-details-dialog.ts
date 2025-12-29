import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListOrderDetails } from '../../contracts/orders/list_order_details';
import { OrderService } from '../../services/common/models/order-service';
import { Alertify, MessageType, Position } from '../../services/admin/alertify';
import { Dialog } from '../../services/common/dialog';
import { OrderCompleteDialog, OrderCompleteState } from '../order-complete-dialog/order-complete-dialog';

@Component({
  selector: 'app-order-details-dialog',
  standalone: false,
  templateUrl: './order-details-dialog.html',
  styleUrl: './order-details-dialog.scss',
})
export class OrderDetailsDialog extends BaseDialog<OrderDetailsDialog> implements OnInit{
    constructor(dialogRef:MatDialogRef<OrderDetailsDialog>,@Inject(MAT_DIALOG_DATA) public data:string,
    private orderService:OrderService,
    private alert:Alertify,
    private dialogService:Dialog,
  private changeR:ChangeDetectorRef ){
      super(dialogRef)
    }
  async ngOnInit() {
     let list_order_details:ListOrderDetails=await this.orderService.getOrderDetails(this.data);
     this.orderDetail=list_order_details 
     this.dataSource=list_order_details.basketItems

   
   this.changeR.detectChanges()
   }
 
    displayedColumns: string[] = ['productName', 'productPrice', 'productQuantity','productTotalPrice'];
    dataSource:any;
    totalPrice:number;
    address:string;
    description:string
    orderDetail:ListOrderDetails
    clickedRows = new Set<any>();
    completeOrder()
    {
      this.dialogService.openDialog({
        compenent: OrderCompleteDialog,
        data:OrderCompleteState.Yes,
        afterClosed: () => {
          this.orderService.completeOrder(this.data, () => {

            this.alert.message("Sipariş Tamamlandı!! Müşteriye mail gönderilmiştir", {
              messageType: MessageType.Success,
              position: Position.TopRight
            })

          }, (error) => {
            this.alert.message(error, {
              messageType: MessageType.Error,
              position: Position.TopRight
            })

          })
        }
      })

    
    }
}


