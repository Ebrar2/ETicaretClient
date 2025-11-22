import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../../../services/common/models/product-service';
import { Base, SpinnerTypeNames } from '../../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { Alertify, MessageType, Position } from '../../../../services/admin/alertify';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { ListProduct } from '../../../../contracts/list_product';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List extends Base implements OnInit{
  displayedColumns:string[]=["name","stock","price","updatedDate","createdDate","edit","delete"];
  dataSource:MatTableDataSource<ListProduct>=null;
   @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private productService:ProductService,spinner:NgxSpinnerService,private aletrtify:Alertify)
  {
    super(spinner)
  }
 async getProducts()
  {
    this.showSpinner(SpinnerTypeNames.BallScaleMultiple);
    const datas:{totalCount:number,products:ListProduct[]}=await this.productService.read(this.paginator?this.paginator.pageIndex:0,this.paginator?this.paginator.pageSize:5,()=>{
      this.hideSpinner(SpinnerTypeNames.BallScaleMultiple);
    },(errorMessage)=>{
       this.aletrtify.message(errorMessage,{
        position:Position.TopRight,
        messageType:MessageType.Error,
         dismissOther:true
       })
    })
    this.dataSource=new MatTableDataSource<ListProduct>(datas.products);
    this.paginator.length=datas.totalCount;
  }
  async ngOnInit() {
   await this.getProducts();
  }
  async pageChanged()
  {
    await this.getProducts();
  }
}
