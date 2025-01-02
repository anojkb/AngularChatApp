// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-chat',
//   standalone: false,
  
//   templateUrl: './chat.component.html',
//   styleUrl: './chat.component.scss'
// })
// export class ChatComponent implements OnInit { 
//   messages: Array<{ sender: string; content: string }> = []; 
//   newMessage: string = ''; 
//   currentUser !: { username: string; } ; 
//   selectedContact !: { username: string } ; 
//   ngOnInit(): void { 
//     this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}'); 
//     this.selectedContact = JSON.parse(localStorage.getItem('selectedContact') || '{}'); 
//     const conversationKey = this.getConversationKey(this.currentUser.username, 
//       this.selectedContact.username); 
//       this.messages = JSON.parse(localStorage.getItem(conversationKey) || '[]'); 
//     } 
//     getConversationKey(user1: string, user2: string): string { 
//       return [user1, user2].sort().join('_'); 
//     } 
//     sendMessage(): void { 
//       const message = { sender: this.currentUser.username, content: this.newMessage }; 
//       this.messages.push(message); 
//       if (this.messages.length > 50) { 
//         this.messages.shift(); 
//       } 
//       const conversationKey = this.getConversationKey(this.currentUser.username, this.selectedContact.username); 
//       localStorage.setItem(conversationKey,JSON.stringify(this.messages)); this.newMessage = ''; 
//       }
// }

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  standalone: false,
  
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {

  // username: string | null = null; 
  // messages: string[] = []; 
  // newMessage: string = ''; 
  
  // constructor(private route: ActivatedRoute, private chatService: ChatService) { } 
  
  // ngOnInit(): void { 
  //   this.username = this.route.snapshot.paramMap.get('username'); 
  //   if (this.username) { 
  //     this.messages = this.chatService.getMessages(this.username); 
  //   } 
  // } 
  // sendMessage(): void { 
  //   if (this.username && this.newMessage.trim()) { 
  //     this.chatService.sendMessage(this.username, this.newMessage); 
  //     this.messages = this.chatService.getMessages(this.username); 
  //     this.newMessage = ''; 
  //   } 
  // }

  @Input() username!: string; 
  messages: any[] = []; 
  // messages: string[] = []; 
  newMessage: string = ''; 
  
  constructor(private chatService: ChatService) {} 
  
  ngOnInit(): void {
     this.messages = this.chatService.getLast50Messages(this.username); 
  }

  sendMessage(): void { 
    if (this.username && this.newMessage.trim()) { 
      this.chatService.sendMessage(this.username, this.newMessage); 
      this.messages = this.chatService.getMessages(this.username); 
      this.newMessage = ''; 
    } 
  
  }
}

