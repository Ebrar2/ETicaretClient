import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { Console, error } from 'console';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
    private _hubConnection:HubConnection;
    get hubConnection()
    {
      return this._hubConnection;
    }
    start(hubUrl:string)
    {
      if(this._hubConnection==null || this._hubConnection?.state==HubConnectionState.Disconnected)
      {
         const builder:HubConnectionBuilder=new HubConnectionBuilder();
         const connection:HubConnection=builder.withUrl(hubUrl).withAutomaticReconnect().build();
         connection.start().then(()=>{
          this._hubConnection=connection;
          console.log("Bağlantı başarılı")}
       
        ).catch(()=>setTimeout(() => {
          this.start(hubUrl)
         }, 2000));
         
         
      }
      else
      {
      this._hubConnection.onreconnected((connectionId)=>console.log("reconnected"))
      this._hubConnection.onreconnecting((error)=>console.log("reconnecting"))
      this._hubConnection.onclose((error)=>console.log("closed"))
      }
  

    }
    invoke(methodName:string,message:string,successCallBack?:(value)=>void,errorCallBack?:(error)=>void)
    {
      this._hubConnection.invoke(methodName,[message]).then(successCallBack).catch(errorCallBack);
    }
    on(methodName:string,callback:(...message)=>void)
    {
      this.hubConnection.on(methodName,callback);
    }
}
