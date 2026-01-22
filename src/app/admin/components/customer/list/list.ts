import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ListCustomer } from '../../../../contracts/customers/list_customer';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from '../../../../services/common/models/user-service';
import { Base, SpinnerTypeNames } from '../../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { Alertify, MessageType, Position } from '../../../../services/admin/alertify';
import { Dialog } from '../../../../services/common/dialog';
import { CustomerOrderDetailsDialog } from '../../../../dialogs/customer-order-details-dialog/customer-order-details-dialog';


@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List extends Base{
   displayedColumns:string[]=["namesurname","email","orderDetails"];
   dataSource:MatTableDataSource<ListCustomer>=null;
   @ViewChild(MatPaginator) paginator: MatPaginator;

     constructor(private userService:UserService,
       spinner:NgxSpinnerService,
       private aletrtify:Alertify,
     private dialogService:Dialog)
     {
       super(spinner)
     }
    async getCustomers(name:string=null)
     {
       this.showSpinner(SpinnerTypeNames.BallScaleMultiple);
       let page=this.paginator?this.paginator.pageIndex:0
       if(name!=null)
         page=0
       const datas:{totalCount:number,customers:ListCustomer[]}=await this.userService.getCustomers(page,this.paginator?this.paginator.pageSize:5,name,()=>{
         this.hideSpinner(SpinnerTypeNames.BallScaleMultiple);
       },(errorMessage)=>{
          this.aletrtify.message(errorMessage,{
           position:Position.TopRight,
           messageType:MessageType.Error,
            dismissOther:true
          })
       })
       this.dataSource=new MatTableDataSource<ListCustomer>(datas.customers);
       
       this.paginator.length=datas.totalCount;
     }
     async ngOnInit() {
      await this.getCustomers();
     }
     async pageChanged()
     {
       await this.getCustomers();
     }
   async searchByName(name:string)
  {
      await this.getCustomers(name)
  }
  showOrderDetails(id:string,name:string)
  {
     this.dialogService.openDialog({
             compenent:CustomerOrderDetailsDialog,
            data:{id:id,name:name},
             options:{
               width:'1800px'
              },afterClosed:()=>{}
            })
  }
}
