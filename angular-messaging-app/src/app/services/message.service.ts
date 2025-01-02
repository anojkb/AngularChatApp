import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  // private readonly storageKey = 'messages'; 
  // getMessages(): any[] { 
  //   // return JSON.parse(localStorage.getItem(this.storageKey)) || []; 
  //   const messages = localStorage.getItem(this.storageKey); 
  //   return messages ? JSON.parse(messages) : [];
  // } 
  // storeMessage(message: any): void { 
  //   const messages = this.getMessages(); 
  //   messages.push(message); 
  //   if (messages.length > 50) { 
  //     messages.shift(); // Keep only the last 50 messages 
  //   } 
  //   localStorage.setItem(this.storageKey, JSON.stringify(messages)); 
  // }
}
