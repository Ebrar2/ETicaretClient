import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Base, SpinnerTypeNames } from '../../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { RoleService } from '../../../../services/common/models/role-service';
import { ListRole } from '../../../../contracts/roles/list_role';
import { Alertify, MessageType, Position } from '../../../../services/admin/alertify';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List extends Base implements OnInit {
  displayedColumns:string[]=["name","edit","delete"];
  dataSource:MatTableDataSource<ListRole>=null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(spinner:NgxSpinnerService,private roleService:RoleService,private alertify:Alertify)
  {
    super(spinner)
  }
  async ngOnInit() {
    await this.getRoles();
  }
 
  async getRoles()
  {
    this.showSpinner(SpinnerTypeNames.BallScaleMultiple);
      const datas:{totalCount:number,roles:ListRole[]}=await this.roleService.getAllRoles(this.paginator?this.paginator.pageIndex:0,this.paginator?this.paginator.pageSize:5,()=>{
        this.hideSpinner(SpinnerTypeNames.BallScaleMultiple);
      },(errorMessage)=>{
                this.hideSpinner(SpinnerTypeNames.BallScaleMultiple);

         this.alertify.message(errorMessage,{
          position:Position.TopRight,
          messageType:MessageType.Error,
           dismissOther:true
         })
      })
      this.dataSource=new MatTableDataSource<ListRole>(datas.roles);
      this.paginator.length=datas.totalCount;
  }
 async pageChanged()
  {
     await this.getRoles();
  }
}
