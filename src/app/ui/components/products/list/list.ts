import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/common/models/product-service';
import { ListProduct } from '../../../../contracts/products/list_product';
import { ActivatedRoute } from '@angular/router';
import { ListProductImage } from '../../../../contracts/products/list_product_image';
import { Base, SpinnerTypeNames } from '../../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { BasketService } from '../../../../services/common/models/basket-service';
import { CustomToastr, ToastrMessageTypes, ToastrPositions } from '../../../../services/ui/custom-toastr';
import { FilterProductItem } from '../filter-product/filter-product';


@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List extends Base implements OnInit {
  constructor(spinner:NgxSpinnerService,private productService:ProductService,private changeD:ChangeDetectorRef,
    private activatedRoute:ActivatedRoute,
    private basketService:BasketService,
    private customToastrService:CustomToastr
  )
  {
    super(spinner)
  }
  products:{
         id:string;
         name:string;
         stock:number;
         price:number;
         productImageFiles:ListProductImage[];
         mainImagePath:string;
  }[];
  currentPageNo:number;
  totalProductCount:number;
  totalPageCount:number;
  productPageSize=10;
  pageItems:number[]=[];
  filter:FilterProductItem=null;
 async ngOnInit() {
   await this.getProducts(false)
    
  }
 async getProducts(controle:boolean=false,searchByName?:string){
      this.activatedRoute.params.subscribe(async params=>{
      this.currentPageNo=parseInt(params["pageNo"]??1)
      if(this.filter!=null || controle)
        this.currentPageNo=1
      const data=await this.productService.read(this.currentPageNo-1,this.productPageSize,{
        filter:this.filter,
        name:searchByName
      },()=>{},()=>{});
     if(data!=null)
     {
          var resultProducts=data.products;
       this.products=[];
       resultProducts.forEach(value=>{
         this.products.push({
          id:value.id,
          name:value.name,
          stock:value.stock,
          price:value.price,
          productImageFiles:value.productImageFiles,
          mainImagePath:value.productImageFiles?.length!=0?data.baseUrl+"/"+value.productImageFiles.find(p=>p.showcase)?.path:""
         })
       })
       this.totalProductCount=data.totalCount;
      this.totalPageCount=Math.ceil(this.totalProductCount/this.productPageSize);
      let last=this.totalPageCount<3?this.totalPageCount:3;
     
      this.editPageItemValues();
       this.changeD.detectChanges();

     }
     })
  }
 async filterProduct(data:FilterProductItem)
  {
    this.filter=data
    await this.getProducts(true);
  }
  editPageItemValues() {
    this.pageItems = []
    if(this.totalPageCount>=this.currentPageNo)
    {
      let birOnce:number = this.currentPageNo - 1;
    let birSonra:number = this.currentPageNo+1;
    let i = 0;
    if (birOnce > 0)
      this.pageItems[i++] = birOnce;
    this.pageItems[i++] = this.currentPageNo;
    if (birSonra <= this.totalPageCount)
      this.pageItems[i++] = birSonra;
    if (i == 2 && (birSonra + 1) <= this.totalPageCount) {
      this.pageItems[i++] = birSonra + 1;
    }
   if (i == 2 && (birOnce -1) >= 1) {
        this.pageItems.unshift(birOnce - 1);
    }
    }

  }
 async addBasketItem(productId)
  {
    this.showSpinner(SpinnerTypeNames.SquareJellyBox);
   await  this.basketService.addBasketItem({
      quantity:1,
      productId:productId
    }).then(()=>{
      
      this.hideSpinner(SpinnerTypeNames.SquareJellyBox)
      this.customToastrService.message("Ürün sepetinize eklendi","Sepete eklendi",{
        messageType:ToastrMessageTypes.Info,
        position:ToastrPositions.TopRight
      })
    });
  }
  searchByName(name:string)
  {
     this.getProducts(true,name)
  }
}
export class FilterProductParameter
{
  name?:string
  filter?:FilterProductItem
}