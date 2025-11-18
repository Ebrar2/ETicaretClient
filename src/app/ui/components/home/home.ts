import { Component, OnInit } from '@angular/core';
import { Base, SpinnerTypeNames } from '../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home extends Base implements OnInit  {
   constructor(spinner:NgxSpinnerService)
   {
     super(spinner)
   }
  ngOnInit(): void {
    this.showSpinner(SpinnerTypeNames.SquareJellyBox)
  }
}
