import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ListOrder } from '../../../../contracts/orders/list_order';
import { OrderService } from '../../../../services/common/models/order-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Alertify, MessageType, Position } from '../../../../services/admin/alertify';
import { Base, SpinnerTypeNames } from '../../../../base/base';
import { Dialog } from '@angular/cdk/dialog';


@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List extends Base {
   displayedColumns:string[]=["orderCode","name","totalPrice","createdDate","delete"];
  dataSource:MatTableDataSource<ListOrder>=null;
   @ViewChild(MatPaginator) paginator: MatPaginator;

     constructor(private orderService:OrderService,
       spinner:NgxSpinnerService,
       private aletrtify:Alertify,
     private dialogService:Dialog)
     {
       super(spinner)
     }
    async getOrders()
     {
       this.showSpinner(SpinnerTypeNames.BallScaleMultiple);
       const datas:{totalCount:number,orders:ListOrder[]}=await this.orderService.getOrders(this.paginator?this.paginator.pageIndex:0,this.paginator?this.paginator.pageSize:5,()=>{
         this.hideSpinner(SpinnerTypeNames.BallScaleMultiple);
       },(errorMessage)=>{
          this.aletrtify.message(errorMessage,{
           position:Position.TopRight,
           messageType:MessageType.Error,
            dismissOther:true
          })
       })
       this.dataSource=new MatTableDataSource<ListOrder>(datas.orders);
       
       this.paginator.length=datas.totalCount;
     }
     async ngOnInit() {
      await this.getOrders();
     }
     async pageChanged()
     {
       await this.getOrders();
     }
   
   
}
