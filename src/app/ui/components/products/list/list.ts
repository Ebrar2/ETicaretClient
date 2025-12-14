import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/common/models/product-service';
import { ListProduct } from '../../../../contracts/list_product';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List implements OnInit {
  constructor(private productService:ProductService,private changeD:ChangeDetectorRef,private activatedRoute:ActivatedRoute)
  {

  }
  products:ListProduct[];
  currentPageNo:number;
  totalProductCount:number;
  totalPageCount:number;
  productPageSize=10;
  pageItems:number[]=[]
  ngOnInit() {
     this.activatedRoute.params.subscribe(async params=>{
      this.currentPageNo=params["pageNo"]??1
      const data=await this.productService.read(this.currentPageNo-1,this.productPageSize,()=>{console.log("başarılı")},()=>{console.log("başarısız")});
       this.products=data.products;
       this.totalProductCount=data.totalCount;
      this.totalPageCount=Math.ceil(this.totalProductCount/this.productPageSize);
      let last=this.totalPageCount<3?this.totalPageCount:3;
      this.pageItems=[]
       for(let i=-1;i<last;i++)
       {
      
        let control:number=i+this.currentPageNo;
        if(control>0 && control<=this.totalPageCount)
           this.pageItems[i+1]=control;
       }
      this.changeD.detectChanges();

     })
    
  }
  
  
}
