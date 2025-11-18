import { Component, OnInit } from '@angular/core';
import { Base, SpinnerTypeNames } from '../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-customer',
  standalone: false,
  templateUrl: './customer.html',
  styleUrl: './customer.scss',
})
export class Customer extends Base implements OnInit{
  constructor(spinner:NgxSpinnerService)
  {
     super(spinner)
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerTypeNames.BallScaleMultiple);
  }
  
}
