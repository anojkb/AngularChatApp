import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  standalone: false,
  
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit{

  @Input() selectedUser: any; 
  messages: string[] = []; 
  newMessage: string = ''; 
  constructor(private chatService: ChatService) {}
  ngOnInit() { 
    this.chatService.getMessages().subscribe((messages: string[]) => { 
      this.messages = messages; 
    }); 
  }
  sendMessage() { 
    if (this.newMessage.trim()) { 
      this.messages.push(this.newMessage); 
      if (this.messages.length > 50) {
         this.messages.shift(); // Keep only the last 50 messages 
        } this.newMessage = ''; 
      } 
    }
}

