import { Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { Console, error } from 'console';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  constructor(@Inject("baseSignalRUrl") private baseSignalRUrl:string)
  {

  }
   start(hub:string)
    {
     let hubUrl = this.baseSignalRUrl + hub;

     const builder: HubConnectionBuilder = new HubConnectionBuilder();
     const connection: HubConnection = builder.withUrl(hubUrl).withAutomaticReconnect().build();
     connection.start().then(() => {
       console.log("Bağlantı başarılı")
     }

     ).catch(() => setTimeout(() => {
       this.start(hubUrl)
     }, 2000));

     connection.onreconnected((connectionId) => console.log("reconnected"))
     connection.onreconnecting((error) => console.log("reconnecting"))
     connection.onclose((error) => console.log("closed"))
      
    return connection;

    }
    invoke(hubUrl:string,methodName:string,message:string,successCallBack?:(value)=>void,errorCallBack?:(error)=>void)
    {
      this.start(hubUrl).invoke(methodName,[message]).then(successCallBack).catch(errorCallBack);
    }
    on(hubUrl:string,methodName:string,callback:(...message)=>void)
    {
      this.start(hubUrl).on(methodName,callback);
    }
}
