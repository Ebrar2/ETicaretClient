import { Component, ViewChild } from '@angular/core';
import { List } from './list/list';

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.html',
  styleUrl: './category.scss',
})
export class Category {
    
    @ViewChild(List) listComponent:List
    createdCategory(event:string)
    {
      this.listComponent.getCategories();

    }
}
