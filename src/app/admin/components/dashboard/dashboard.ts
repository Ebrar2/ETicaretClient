import { Component, OnInit } from '@angular/core';
import { Base, SpinnerTypeNames } from '../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard extends Base implements OnInit
{
  constructor(spinner:NgxSpinnerService)
  {
    super(spinner)
  }
   ngOnInit(): void {
     this.showSpinner(SpinnerTypeNames.BallScaleMultiple);
   }
}
