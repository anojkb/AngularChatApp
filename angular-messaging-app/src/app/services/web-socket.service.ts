import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socket$: WebSocketSubject<any>; 
  private readonly url = 'ws://localhost:8080'; // WebSocket server URL

   constructor() { this.socket$ = webSocket(this.url); } 

   public sendMessage(msg: any): void { 
      this.socket$.next(msg); 
    } 
    public getMessages(): Observable<any> { return this.socket$.asObservable(); }
}
