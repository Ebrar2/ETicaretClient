import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Products } from './products';
import { RouterModule } from '@angular/router';
import { List } from './list/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FilterProduct } from './filter-product/filter-product';
import { ShowProductDetail } from './show-product-detail/show-product-detail';



@NgModule({
  declarations: [
    Products,
    List,
    FilterProduct,
    ShowProductDetail
  ],
  imports: [
    CommonModule, RouterModule.forChild([
        { path: "", component: Products },
        {path:"details/:id",component:ShowProductDetail}
    ])
]
})
export class ProductsModule { }
