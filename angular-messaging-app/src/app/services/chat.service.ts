import { Injectable } from '@angular/core';

// interface MessageDictionary { [key: string]: string[]; }

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  // private users = JSON.parse(localStorage.getItem('users') || '[]'); 
  // private messages: MessageDictionary = {}; 

  // getUsers() { 
  //   return this.users; 
  // } 

  getMessages(username: string) { 
    if (!this.messages[username]) { 
      this.messages[username] = []; 
    } 
    return this.messages[username]; 
  } 

  sendMessage(username: string, message: string) { 
    if (!this.messages[username]) { 
      this.messages[username] = []; 
    } 
    this.messages[username].push(message); 
  }

  private messages: {[key: string]: string[]} = {
    user1: ['hi'], // Replace with your messages 
    user2: ['Hello'], 
  };
  
  getLast50Messages(username: string) { 
    const allMessages = this.messages[username] || []; 
    return allMessages.slice(-50); // Get last 50 messages 
    }
}
