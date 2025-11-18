import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Base, SpinnerTypeNames } from '../../../base/base';

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
   ngOnInit(): void {
     this.showSpinner(SpinnerTypeNames.SquareJellyBox);
   }
}
