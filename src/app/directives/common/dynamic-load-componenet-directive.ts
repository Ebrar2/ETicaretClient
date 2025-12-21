import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicLoadComponenetDirective]',
  standalone: false
})
export class DynamicLoadComponenetDirective {

  constructor(public viewContainerRef:ViewContainerRef) { }

}
