import { Component, ViewChild } from '@angular/core';
import { ListUser } from '../../../../contracts/users/list_user';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from '../../../../services/common/models/user-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Base, SpinnerTypeNames } from '../../../../base/base';
import { Alertify, MessageType, Position } from '../../../../services/admin/alertify';
import { MatTableDataSource } from '@angular/material/table';
import { Dialog } from '../../../../services/common/dialog';
import { AuthorizeUserDialog } from '../../../../dialogs/authorize-user-dialog/authorize-user-dialog';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List extends Base{
 displayedColumns:string[]=["username","namesurname","email","twoFactorEnabled","assignRole","edit","delete"];
  dataSource:MatTableDataSource<ListUser>=null;
   @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private userService:UserService,
    spinner:NgxSpinnerService,
    private aletrtify:Alertify,
   private dialogService:Dialog)
  {
    super(spinner)
  }
 async getUsers()
  {
    this.showSpinner(SpinnerTypeNames.BallScaleMultiple);
    const datas:{totalCount:number,users:ListUser[]}=await this.userService.getAllUsers(this.paginator?this.paginator.pageIndex:0,this.paginator?this.paginator.pageSize:5,()=>{
      this.hideSpinner(SpinnerTypeNames.BallScaleMultiple);
    },(errorMessage)=>{
       this.aletrtify.message(errorMessage,{
        position:Position.TopRight,
        messageType:MessageType.Error,
         dismissOther:true
       })
    })
    this.dataSource=new MatTableDataSource<ListUser>(datas.users);
    this.paginator.length=datas.totalCount;
  }
  async ngOnInit() {
   await this.getUsers();
  }
  async pageChanged()
  {
    await this.getUsers();
  }
  async assignRole(id:string)
  {
     this.dialogService.openDialog({
          compenent:AuthorizeUserDialog,
          data:id,
           options:{
            width:'1400px'
          },afterClosed:()=>{}
        })
  }
}
