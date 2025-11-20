import { Injectable } from '@angular/core';
declare var alertify:any;
@Injectable({
  providedIn: 'root',
})
export class Alertify {
   message(message:string,alertifyOptions:Partial<AlertifyOptions>)
   {
     alertify.set('notifier','position',alertifyOptions.position);
     alertify.set('notifier','delay', alertifyOptions.delay);
     alertify[alertifyOptions.messageType](message);
  
   }
   dismiss()
   {
    alertify.dismissAll();
   }
}
export class AlertifyOptions
{
  messageType:MessageType=MessageType.Message;
  position:Position=Position.TopRight;
  delay:number=3;
  dismissOther:boolean=false;
}
export enum MessageType
{
  Error="error",
  Success="success",
  Message="message",
  Warning="warning",
  Notify="notify"
}
export enum Position
{
  TopRight="top-right",
  TopCenter="top-center",
  TopLeft="top-left",
  BottomRight="bottom-right",
  BottomLeft="bottom-left",
  BottomCenter="bottom-center"
}