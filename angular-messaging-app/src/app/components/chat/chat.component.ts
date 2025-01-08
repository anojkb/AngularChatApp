import { Component, Input, OnChanges, OnInit , SimpleChanges} from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { ChatService } from '../../services/chat.service';
import { WebSocketService } from '../../services/web-socket.service';
import { UserService } from '../../services/userList.service';

@Component({
  selector: 'app-chat',
  standalone: false,
  
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit , OnChanges{

  @Input() selectedUser: any; 
  messages: any[] = []; 
  allMessages: any[] = [];
  newMessage: string = ''; 
  currentUser: any;
  constructor(private chatService: ChatService,private userService: UserService,private wsService: WebSocketService) {}
  ngOnInit() { 
    this.currentUser = this.userService.getCurrentUser();
    this.loadMessagesForSelectedUser()
    console.log("user::",this.currentUser);
    this.wsService.getMessages().subscribe((message: any) => {
      const parsedMessage = JSON.parse(message); 
      this.allMessages.push(parsedMessage); 
      console.log("mes::",this.allMessages);
      if ((parsedMessage.sender === this.selectedUser.username && 
          parsedMessage.receiver === this.currentUser.username) || 
          (parsedMessage.sender === this.currentUser.username && 
            parsedMessage.receiver === this.selectedUser.username)) { 
              this.messages.push(parsedMessage); 
            } 
      if (this.messages.length > 50) { 
        this.messages.shift(); // Keep only the last 50 messages 
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) { 
    if (changes['selectedUser'] && !changes['selectedUser'].isFirstChange()) {
       this.loadMessagesForSelectedUser(); 
      } 
  }

  loadMessagesForSelectedUser() { 
    this.messages = this.allMessages.filter(msg => 
      (msg.sender === this.selectedUser.username && 
        msg.receiver === this.currentUser.username) || 
    (msg.sender === this.currentUser.username &&
      msg.receiver === this.selectedUser.username) ).slice(-50);
      console.log("message::",this.messages);
  }
  sendMessage() { 
    if (this.newMessage.trim() && this.selectedUser) { 
      const message = { 
        sender: this.currentUser.username, 
        receiver: this.selectedUser.username, 
        content: this.newMessage, 
        timestamp: new Date() 
      }; 
      this.wsService.sendMessage(JSON.stringify(message));
      // this.allMessages.push(message);
      this.messages.push(message.content); 
      if (this.messages.length > 50) { 
        this.messages.shift(); // Keep only the last 50 messages 
      }
      this.newMessage = ''; 
    } 
  }
}

// export class ChatComponent implements OnInit, OnChanges {

//   @Input() selectedUser: any; 
//   messages: any[] = []; 
//   allMessages: any[] = [];
//   newMessage: string = ''; 
//   currentUser: any;

//   constructor(private wsService: WebSocketService, private userService: UserService) {}

//   ngOnInit() { 
//     this.currentUser = this.userService.getCurrentUser();
//     console.log("user::", this.currentUser);

//     // Fetch messages from localStorage
//     const storedMessages = localStorage.getItem('allMessages');
//     if (storedMessages) {
//       this.allMessages = JSON.parse(storedMessages);
//     }
//     this.loadMessagesForSelectedUser();

//     // Subscribe to incoming messages
//     this.wsService.getMessages().subscribe((message: any) => {
//       const parsedMessage = JSON.parse(message); 
//       this.allMessages.push(parsedMessage); 
      
//       // Store messages in localStorage
//       localStorage.setItem('allMessages', JSON.stringify(this.allMessages));
//       console.log("Received message::", parsedMessage);

//       if ((parsedMessage.sender === this.selectedUser.username && 
//           parsedMessage.receiver === this.currentUser.username) || 
//           (parsedMessage.sender === this.currentUser.username && 
//             parsedMessage.receiver === this.selectedUser.username)) { 
//               this.messages.push(parsedMessage); 
//             } 
//       if (this.messages.length > 50) { 
//         this.messages.shift(); // Keep only the last 50 messages 
//       }
//     });
//   }

//   ngOnChanges(changes: SimpleChanges) { 
//     if (changes['selectedUser'] && !changes['selectedUser'].isFirstChange()) {
//       this.loadMessagesForSelectedUser(); 
//     } 
//   }

//   loadMessagesForSelectedUser() { 
//     this.messages = this.allMessages.filter(msg => 
//       (msg.sender === this.selectedUser.username && 
//         msg.receiver === this.currentUser.username) || 
//     (msg.sender === this.currentUser.username &&
//       msg.receiver === this.selectedUser.username)).slice(-50);
//     console.log("Filtered messages::", this.messages);
//   }

//   sendMessage() { 
//     if (this.newMessage.trim() && this.selectedUser) { 
//       const message = { 
//         sender: this.currentUser.username, 
//         receiver: this.selectedUser.username, 
//         content: this.newMessage, 
//         timestamp: new Date() 
//       }; 
//       this.wsService.sendMessage(JSON.stringify(message));
//       this.newMessage = ''; 
//     } 
//   }
// }



