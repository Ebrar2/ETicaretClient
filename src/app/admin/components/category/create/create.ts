import { Component, EventEmitter, Output } from '@angular/core';
import { Base, SpinnerTypeNames } from '../../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from '../../../../services/common/models/category-service';
import { Alertify, MessageType, Position } from '../../../../services/admin/alertify';

@Component({
  selector: 'app-create',
  standalone: false,
  templateUrl: './create.html',
  styleUrl: './create.scss',
})
export class Create extends Base {
  constructor(spinner:NgxSpinnerService,private categoryService:CategoryService,private alertify:Alertify)
  {
    super(spinner)
  }
 @Output() createdCategory: EventEmitter<string> = new EventEmitter();

 create(name:HTMLInputElement)
  {
     this.showSpinner(SpinnerTypeNames.BallScaleMultiple)
     
       this.categoryService.create(name.value,()=>{
        this.hideSpinner(SpinnerTypeNames.BallScaleMultiple)
        this.alertify.message("Kategori Ekleme Başarılı",{
          messageType:MessageType.Success,
          position:Position.TopRight,
          dismissOther:true
        })
        this.createdCategory.emit(name.value)
       },(errorMessage)=>{
        this.alertify.message(errorMessage,{
          messageType:MessageType.Error,
          position:Position.TopRight,
          dismissOther:true
        });
       })
  }
}
