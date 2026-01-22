import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ListOrder } from '../../contracts/orders/list_order';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Alertify, MessageType, Position } from '../../services/admin/alertify';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderService } from '../../services/common/models/order-service';
import { ListCustomerOrder } from '../../contracts/customers/list_customerOrder';
import { UserService } from '../../services/common/models/user-service';
import { SpinnerTypeNames } from '../../base/base';

@Component({
  selector: 'app-customer-order-details-dialog',
  standalone: false,
  templateUrl: './customer-order-details-dialog.html',
  styleUrl: './customer-order-details-dialog.scss',
})
export class CustomerOrderDetailsDialog extends BaseDialog<CustomerOrderDetailsDialog> implements OnInit{
   displayedColumns:string[]=["orderCode","totalPrice","createdDate","completed"];
  dataSource:MatTableDataSource<ListCustomerOrder>=null;
    constructor(dialogRef: MatDialogRef<CustomerOrderDetailsDialog>, @Inject(MAT_DIALOG_DATA) public data: {id:string,name:string},
    private alert: Alertify,
    private spinner: NgxSpinnerService,
  private userService:UserService,
private changeR:ChangeDetectorRef) {
    super(dialogRef)
  }
  async ngOnInit() {
   let orders:{customerOrders:ListCustomerOrder[]}=await this.userService.getCustomerOrders(this.data.id,()=>{
   },(errorMessage)=>{
     
   })
    this.dataSource=new MatTableDataSource<ListCustomerOrder>(orders.customerOrders);
   this.changeR.detectChanges()
   }
}

