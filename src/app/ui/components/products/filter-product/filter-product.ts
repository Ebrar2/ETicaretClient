import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { CategoryService } from '../../../../services/common/models/category-service';

@Component({
  selector: 'app-filter-product',
  standalone: false,
  templateUrl: './filter-product.html',
  styleUrl: './filter-product.scss',
})
export class FilterProduct implements OnInit {
  @Output() filterProduct: EventEmitter<any> = new EventEmitter();

  constructor(private categoryService: CategoryService) {

  }
  price=signal<number>(150)
  allCategories = signal([])
  async ngOnInit(): Promise<void> {
    const getcategories = (await this.categoryService.getAll(-1, -1, () => { }, () => { })).categories
    getcategories.map(c => c.name).forEach(element => {
      this.allCategories.update(c => [...c, element]);
    })

  }
onSearchChange(value)
{
    this.price.set(value)
}
filter()
{
  let filterProductItem=new FilterProductItem();
  filterProductItem.price=this.price()
 const checked = document.querySelectorAll('#brandFilters input[type="checkbox"]:checked');
  checked.forEach(element => {
    filterProductItem.categories.push(element.getAttribute("value"))
  });
  this.filterProduct.emit(filterProductItem)
}
reset()
{
    this.filterProduct.emit(null)
}
}

export class FilterProductItem
{
    price?:number
    categories?:string[]=[]
}