import { Directive, ElementRef, EventEmitter, HostListener, Input,Output, Renderer2 } from '@angular/core';
import { HttpClientService } from '../../services/common/http-client';
import { Base, SpinnerTypeNames } from '../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialog, DeleteState } from '../../dialogs/delete-dialog/delete-dialog';
import { Alertify, MessageType, Position } from '../../services/admin/alertify';
import { HttpErrorResponse } from '@angular/common/http';
import { Dialog } from '../../services/common/dialog';

declare var $:any;
@Directive({
  selector: '[appDelete]',
  standalone: false
})
export class Delete {

  constructor(public dialogService:Dialog,
    private spinner:NgxSpinnerService,
    private  element:ElementRef,
    private renderer:Renderer2,
    private httpClientService:HttpClientService,
    private alertifyService:Alertify)
   { 
     const img=renderer.createElement("img");
     img.setAttribute("src","delete.png");
     img.setAttribute("style","cursor:pointer");
     img.width=25;
     img.height=25;
     renderer.appendChild(element.nativeElement,img);

   }
   @Input() id:string;
   @Input() controller:string;
   @Output() callback: EventEmitter<any> = new EventEmitter();

   @HostListener("click")
   onClick()
   {
    this.dialogService.openDialog({
      compenent:DeleteDialog,
      data:DeleteState.Yes,
      afterClosed:()=>{

    this.spinner.show(SpinnerTypeNames.BallScaleMultiple)
    this.httpClientService.delete({
          controller:this.controller,
        },this.id).subscribe(()=>{
           const td:HTMLTableCellElement=this.element.nativeElement
        $(td.parentElement).fadeOut(200,()=>{
          this.callback.emit();
          this.alertifyService.message("Silme işlemi başarılı",
            {
               messageType:MessageType.Success,
               position:Position.TopRight,
               dismissOther:true
            }
          )
        });

        },(error:HttpErrorResponse)=> {
           this.spinner.hide(SpinnerTypeNames.BallScaleMultiple);
            this.alertifyService.message("Silme işlemi başarısız",
            {
               messageType:MessageType.Error,
               position:Position.TopRight,
               dismissOther:true
            })
          }
        
      );
       
    }
    })

   }





}
