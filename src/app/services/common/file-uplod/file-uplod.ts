import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client';
import { Alertify, MessageType, Position } from '../../admin/alertify';
import { CustomToastr, ToastrMessageTypes, ToastrPositions } from '../../ui/custom-toastr';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadDialog, FileUploadState } from '../../../dialogs/file-upload-dialog/file-upload-dialog';
import { Dialog } from '../dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Base, SpinnerTypeNames } from '../../../base/base';

@Component({
  selector: 'app-file-uplod',
  standalone: false,
  templateUrl: './file-uplod.html',
  styleUrl: './file-uplod.scss',
})
export class FileUplod extends Base{
  constructor(private httpClientService:HttpClientService,
    private alertify:Alertify,
    private toastr:CustomToastr,
   private dialogService:Dialog,
   spinner:NgxSpinnerService)
  {
   super(spinner)
  }
 public files: NgxFileDropEntry[] ;
 @Input() options:Partial<FileUplodOption>;
 
  

  public selectedFiles(files: NgxFileDropEntry[]) {
      this.files = files;
     this.dialogService.openDialog({
      compenent:FileUploadDialog,
      data:FileUploadState.Yes,
      afterClosed:()=>{
    this.showSpinner(SpinnerTypeNames.BallScaleMultiple);
    const fileData:FormData=new FormData();
    for (const file of files) {

      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }
    this.httpClientService.post({
      controller:this.options.controller,
      action:this.options.action,
      queryString:this.options.query,
      headers: new HttpHeaders({ "responseType": "blob" })
     
    },fileData).subscribe(()=>{
    const message:string="Dosyalar başarıyla yüklenmiştir";
    this.hideSpinner(SpinnerTypeNames.BallScaleMultiple);
       if(this.options.isAdmin)
       {
           this.alertify.message(message,{
             messageType:MessageType.Success,
             position:Position.TopRight,
             dismissOther:true
           });
       }
       else
       {
            this.toastr.message(message,"Başarılı",
              {
                  position:ToastrPositions.TopRight,
                  messageType:ToastrMessageTypes.Success
              }
            );
       }
    },(error:HttpErrorResponse)=>{
       const message:string="Dosyalar yükleme başarısız";
       this.hideSpinner(SpinnerTypeNames.BallScaleMultiple);
       if(this.options.isAdmin)
       {
           this.alertify.message(message,{
             messageType:MessageType.Error,
             position:Position.TopRight,
             dismissOther:true
           });
       }
       else
       {
            this.toastr.message(message,"Başarısız",
              {
                  position:ToastrPositions.TopRight,
                  messageType:ToastrMessageTypes.Error
              }
            );
       }
    });
     }})
   }
  
}
export class FileUplodOption
{
  controller?:string;
  action?:string;
  query?:string;
  explanation:string;
  accept?:string;
  isAdmin:boolean;
}