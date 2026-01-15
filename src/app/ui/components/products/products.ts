import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Base, SpinnerTypeNames } from '../../../base/base';
import { List } from './list/list';
import { FilterProductItem } from './filter-product/filter-product';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products extends Base implements OnInit{
   constructor(spinner:NgxSpinnerService)
   {
      super(spinner)
   }
     @ViewChild(List) listComponent:List
    filterProduct(filterProduct)
    {
      this.listComponent.filterProduct(filterProduct)

    }
   ngOnInit(): void {
   }
}
