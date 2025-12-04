import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

export class Base {
    constructor(private spinner:NgxSpinnerService){}
    showSpinner(spinnerTypeName:any)
    {
      this.spinner.show(spinnerTypeName);

   setTimeout(() => {
      this.spinner.hide(spinnerTypeName);
    }, 1000);

    }
    hideSpinner(spinnerTypeName:any)
    {
      this.spinner.hide(spinnerTypeName);
    }
}
export enum SpinnerTypeNames
{
  SquareJellyBox="spinner1",
  BallSpinClockwiseFade="spinner2",
  BallScaleMultiple="spinner3"

}