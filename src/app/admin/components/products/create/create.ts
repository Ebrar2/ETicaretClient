import { ChangeDetectorRef, Component, computed, inject, model, OnInit, Output, signal } from '@angular/core';
import { ProductService } from '../../../../services/common/models/product-service';
import { CreateProduct } from '../../../../contracts/products/create_product';
import { parse } from 'path';
import { Base, SpinnerTypeNames } from '../../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { Alertify, MessageType, Position } from '../../../../services/admin/alertify';
import { EventEmitter } from '@angular/core';
import { FileUplodOption } from '../../../../services/common/file-uplod/file-uplod';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ListCategory } from '../../../../contracts/categories/list_category';
import { CategoryService } from '../../../../services/common/models/category-service';

@Component({
  selector: 'app-create',
  standalone: false,
  templateUrl: './create.html',
  styleUrl: './create.scss',
})
export class Create extends Base implements OnInit {

  constructor(spinner:NgxSpinnerService,private productService:ProductService,private alertify:Alertify,
    private categoryService:CategoryService,
    private change:ChangeDetectorRef
  )
  {
    super(spinner)
  }
  getAllcategories:ListCategory[]
  async ngOnInit(): Promise<void> {
      this.getAllcategories= (await this.categoryService.getAll(-1,-1,()=>{},()=>{})).categories
     this.getAllcategories.map(c=>c.name).forEach(elemenet=>{
      this.allCategories.update(c => [...c, elemenet]);
     })
   }
 @Output() createdProduct: EventEmitter<CreateProduct> = new EventEmitter();

 create(name:HTMLInputElement,price:HTMLInputElement,stock:HTMLInputElement)
  {
     this.showSpinner(SpinnerTypeNames.BallScaleMultiple)
     const createProduct:CreateProduct=new CreateProduct();
     const selectedCategories=this.categories()
     let selected=[];
     selectedCategories.forEach(element => {
           let category=this.getAllcategories.filter(c=>c.name==element)[0]
           selected.push(category.id)
     });
     createProduct.name=name.value;
     createProduct.price=parseFloat(price.value);
     createProduct.stock=parseInt(stock.value);
     createProduct.categories=selected
       this.productService.create(createProduct,()=>{
        this.hideSpinner(SpinnerTypeNames.BallScaleMultiple)
        this.alertify.message("Ürün Ekleme Başarılı",{
          messageType:MessageType.Success,
          position:Position.TopRight,
          dismissOther:true
        })
        this.createdProduct.emit(createProduct)
       },(errorMessage)=>{
        this.alertify.message(errorMessage,{
          messageType:MessageType.Error,
          position:Position.TopRight,
          dismissOther:true
        });
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
