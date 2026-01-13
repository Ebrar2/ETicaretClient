import { ChangeDetectorRef, Component, computed, inject, Inject, Input, model, OnInit, signal } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../services/common/models/product-service';
import {COMMA, ENTER, T} from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { CategoryService } from '../../services/common/models/category-service';
import { ListCategory } from '../../contracts/categories/list_category';
import { UpdateProductList } from '../../contracts/products/update_product_list';
import { UpdateProduct } from '../../contracts/products/update_product';
import { Alertify, MessageType, Position } from '../../services/admin/alertify';
import { SpinnerTypeNames } from '../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { get } from 'http';

@Component({
  selector: 'app-update-product-dialog',
  standalone: false,
  templateUrl: './update-product-dialog.html',
  styleUrl: './update-product-dialog.scss',
})
export class UpdateProductDialog extends BaseDialog <UpdateProductDialog> implements OnInit{
    constructor(dialogRef:MatDialogRef<UpdateProductDialog>,@Inject(MAT_DIALOG_DATA)public data:string,
      private productService:ProductService,
    private categoryService:CategoryService,
    private changer:ChangeDetectorRef,
    private alert:Alertify,
    private spinner:NgxSpinnerService)
    {
      super(dialogRef)
    }
    product:UpdateProductList
    getAllcategories:ListCategory[];
async  ngOnInit():Promise<void> {
    this.product=await this.productService.getById(this.data,()=>{},(err)=>{})
     this.getAllcategories= (await this.categoryService.getAll(-1,-1,()=>{},()=>{})).categories
     this.getAllcategories.map(c=>c.name).forEach(element=>{
         this.allCategories.update(c => [...c, element]);
     })
     const selectedCategories=this.product.categories;
    
      selectedCategories.forEach(element => {
            this.categories.update(c => [...c, element]);
      
      });
     
  }
    update(name:HTMLInputElement,price:HTMLInputElement,stock:HTMLInputElement)
    {
       
        const selectedCategories=this.categories()
        let selected=[];
        selectedCategories.forEach(element => {
           let category=this.getAllcategories.filter(c=>c.name==element)[0]
           selected.push(category.id)
        });
        
        this.spinner.show(SpinnerTypeNames.BallScaleMultiple)
        this.productService.updateProduct({
          id:this.data,
          price:parseFloat(price.value),
          stock:parseInt(stock.value),
          categories:selected,
          name:name.value
        },()=>{
                this.spinner.hide(SpinnerTypeNames.BallScaleMultiple)
                    this.alert.message("Ürün Güncelleme Başarılı",{
                      messageType:MessageType.Success,
                      position:Position.TopRight,
                      dismissOther:true
             })
        },(error)=>{
          this.spinner.hide(SpinnerTypeNames.BallScaleMultiple)
                    this.alert.message("Ürün Güncelleme Başarısız",{
                      messageType:MessageType.Error,
                      position:Position.TopRight,
                      dismissOther:true
             })
        })      
    }

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly currentCategory = model('');
  readonly categories = signal([]);
  readonly allCategories=signal([]);
  readonly filteredCategories = computed(() => {
    const  current = this.currentCategory().toLowerCase();
     const selected = this.categories();
     const getAll=this.allCategories()
  return getAll
    .filter(c => !selected?.includes(c)) 
    .filter(c =>
     c.toLowerCase().includes(current)
    );
    
  });

  readonly announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.categories.update(c => [...c, value]);
    }

    this.currentCategory.set('');
  }

  remove(category: string): void {
    this.categories.update(c => {
      const index = c.indexOf(category);
      if (index < 0) {
        return c;
      }

      c.splice(index, 1);
      this.announcer.announce(`Removed ${category}`);
      return [...c];
    });
   
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.categories.update(c => [...c, event.option.viewValue]);
    this.currentCategory.set('');
    event.option.deselect();
  }
}
