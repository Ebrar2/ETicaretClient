import { Component, OnInit, ViewChild } from '@angular/core';
import { Base, SpinnerTypeNames } from '../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientService } from '../../../services/common/http-client';
import { CreateProduct } from '../../../contracts/create_product';
import { List } from './list/list';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products extends Base implements OnInit {
   constructor(spinner:NgxSpinnerService,private httpClientService:HttpClientService)
   {
   super(spinner);
   }
   ngOnInit(): void {
     this.showSpinner(SpinnerTypeNames.BallScaleMultiple);
     
    //  this.httpClientService.delete({
   //     controller:"product"
     // },"b6b51a3c-4ad1-47c0-8062-d7aba07cbcd9").subscribe();

   //  this.httpClientService.get({
     // baseUrl:"https://jsonplaceholder.typicode.com",
      //controller:"posts"
     //}).subscribe(data=>console.log(data));
    }
    @ViewChild(List) listComponent:List
    createdProduct(createProduct:CreateProduct)
    {
      this.listComponent.getProducts();

    }
}
