import { Directive, ElementRef, EventEmitter, HostListener, Input,Output, Renderer2 } from '@angular/core';
import { HttpClientService } from '../../services/common/http-client';
import { Base, SpinnerTypeNames } from '../../base/base';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialog, DeleteState } from '../../dialogs/delete-dialog/delete-dialog';

declare var $:any;
@Directive({
  selector: '[appDelete]',
  standalone: false
})
export class Delete {

  constructor(public dialog:MatDialog,private spinner:NgxSpinnerService,private  element:ElementRef,private renderer:Renderer2,private httpClientService:HttpClientService)
   { 
     const img=renderer.createElement("img");
     img.setAttribute("src","delete.png");
     img.setAttribute("style","cursor:pointer");
     img.width=25;
     img.height=25;
     renderer.appendChild(element.nativeElement,img);

   }
   @Input() id:string;
   @Output() callback: EventEmitter<any> = new EventEmitter();

   @HostListener("click")
   onClick()
   {
    this.openDialog(()=>{

    this.spinner.show(SpinnerTypeNames.BallScaleMultiple)
        this.httpClientService.delete({
          controller:"product",
        },this.id).subscribe();
            const td:HTMLTableCellElement=this.element.nativeElement
        $(td.parentElement).fadeOut(200,()=>{
          this.callback.emit();
        });

    })
   }


 openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(DeleteDialog, {
     width: '250px',
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == DeleteState.Yes)
        afterClosed();
    });
  }


}
