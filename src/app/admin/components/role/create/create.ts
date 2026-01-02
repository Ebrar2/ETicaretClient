import { Component, EventEmitter, Output } from '@angular/core';
import { RoleService } from '../../../../services/common/models/role-service';
import { Base, SpinnerTypeNames } from '../../../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { Alertify, MessageType, Position } from '../../../../services/admin/alertify';

@Component({
  selector: 'app-create',
  standalone: false,
  templateUrl: './create.html',
  styleUrl: './create.scss',
})
export class Create extends Base {
   @Output() createdRole: EventEmitter<string> = new EventEmitter();
  constructor(private roleService:RoleService,spinner:NgxSpinnerService,private alertService:Alertify)
  {
    super(spinner)
  }
  async create(name:string)
  {
   this.showSpinner(SpinnerTypeNames.BallScaleMultiple); 
   await this.roleService.createRole(name,(result)=>{
    if(result.succeeded)
    {
       this.alertService.message("Rol Ekleme Başarılı", {
       messageType: MessageType.Success,
       position: Position.TopRight
     })
     this.createdRole.emit(name)
    }
    else
    {
       this.alertService.message("Rol Ekleme Başarısız! Bu isim de bir rol bulunmaktadır", {
       messageType: MessageType.Error,
       position: Position.TopRight
     })
    }
    
     
   },()=>{
     this.alertService.message("Rol Ekleme Başarısız", {
        messageType: MessageType.Error,
        position: Position.TopRight
      })
   
   });
    this.hideSpinner(SpinnerTypeNames.BallScaleMultiple); 

  }
}
