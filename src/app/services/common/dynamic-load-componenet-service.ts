import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DynamicLoadComponenetService {
  async loadComponenet(componenet,viewContainerRef:ViewContainerRef)
  {
       let newcomponent;
       switch (componenet){
        case ComponenetName.BasketsComponent:
          newcomponent=(await import("../../ui/components/baskets/baskets")).Baskets

       }
       viewContainerRef.clear();
     return  viewContainerRef.createComponent(newcomponent)
        
  }
}
export enum ComponenetName
{
   BasketsComponent
}