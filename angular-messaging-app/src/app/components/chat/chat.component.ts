import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { ChatService } from '../../services/chat.service';
import { UserService } from '../../services/user.service';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-chat',
  standalone: false,
  
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit{

  @Input() selectedUser: any; 
  messages: any[] = []; 
  newMessage: string = ''; 
  currentUser: any;
  constructor(private chatService: ChatService,private userService: UserService,private wsService: WebSocketService) {}
  ngOnInit() { 
    this.currentUser = this.userService.getCurrentUser();
    console.log("user::",this.currentUser);
    // this.chatService.getMessages().subscribe((messages: string[]) => { 
    //   this.messages = messages; 
    // }); 
    // ***new
    this.wsService.getMessages().subscribe((message: any) => { 
      if (message.sender === this.selectedUser.username 
        || message.sender === this.currentUser.username) { 
          this.messages.push(message); 
        } 
      if (this.messages.length > 50) { 
        this.messages.shift(); // Keep only the last 50 messages 
      } 
    });
    // new***
  }
  // sendMessage() { 
  //   if (this.newMessage.trim()) { 
  //     this.messages.push(this.newMessage); 
  //     if (this.messages.length > 50) {
  //        this.messages.shift(); // Keep only the last 50 messages 
  //       } this.newMessage = ''; 
  //     } 
  //   }

  // ****new
  sendMessage() { 
    if (this.newMessage.trim() && this.selectedUser) { 
      const message = { 
        sender: this.currentUser.username, 
        receiver: this.selectedUser.username, 
        content: this.newMessage, 
        timestamp: new Date() 
      }; 
      // this.wsService.sendMessage(message);
      this.wsService.sendMessage(JSON.stringify(message));
      this.messages.push(message.content); 
      this.newMessage = ''; 
    } 
  }
  // new****
}

