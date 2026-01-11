import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ListCategory } from '../../../../contracts/categories/list_category';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { Alertify, MessageType, Position } from '../../../../services/admin/alertify';
import { Dialog } from '../../../../services/common/dialog';
import { Base, SpinnerTypeNames } from '../../../../base/base';
import { CategoryService } from '../../../../services/common/models/category-service';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List extends Base{
 displayedColumns:string[]=["name","updatedDate","createdDate","edit","delete"];
  dataSource:MatTableDataSource<ListCategory>=null;
   @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private categoryService:CategoryService,
    spinner:NgxSpinnerService,
    private aletrtify:Alertify,
  private dialogService:Dialog)
  {
    super(spinner)
  }
 async getCategories()
  {
    this.showSpinner(SpinnerTypeNames.BallScaleMultiple);
    const datas:{totalCount:number,categories:ListCategory[]}=await this.categoryService.getAll(this.paginator?this.paginator.pageIndex:0,this.paginator?this.paginator.pageSize:5,()=>{
      this.hideSpinner(SpinnerTypeNames.BallScaleMultiple);
    },(errorMessage)=>{
       this.aletrtify.message(errorMessage,{
        position:Position.TopRight,
        messageType:MessageType.Error,
         dismissOther:true
       })
    })
    this.dataSource=new MatTableDataSource<ListCategory>(datas.categories);
    this.paginator.length=datas.totalCount;
  }
  async ngOnInit() {
   await this.getCategories();
  }
  async pageChanged()
  {
    await this.getCategories();
  }
 
}
