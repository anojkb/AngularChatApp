import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private messagesSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]); 
  private messages: string[] = []; 
  constructor() {} 

  sendMessage(message: string) { 
    this.messages.push(message); 
    if (this.messages.length > 50) { 
      this.messages.shift(); // Keep only the last 50 messages 
      }
    this.messagesSubject.next([...this.messages]); // Emit a copy of the messages array 
    } 
    getMessages(): Observable<string[]> { 
      return this.messagesSubject.asObservable(); 
    }
}
