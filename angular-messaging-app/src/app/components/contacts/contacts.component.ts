import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-contacts',
  standalone: false,
  
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
// export class ContactsComponent 
// implements OnInit{
//   contacts: Array<{ username: string }> = []; 
//   constructor(private router: Router) {} 
//   ngOnInit(): void { 
//     this.contacts = JSON.parse(localStorage.getItem('users') || '[]'); 
//   } 
//   startChat(contact: { username: string }): void { 
//     localStorage.setItem('selectedContact', JSON.stringify(contact)); this.router.navigate(['/chat']); 
//   }
// }

export class ContactsComponent implements OnInit { 
  // users: any[] = []; 
  // constructor(private chatService: ChatService) { } 
  // ngOnInit(): void { 
  //   this.users = this.chatService.getUsers(); 
  // } 

  currentUser: any; otherUsers: any[] = []; 
  selectedUser: any; 
  constructor(private userService: UserService, private router: Router) {} 
  
  ngOnInit(): void { 
    this.currentUser = this.userService.getCurrentUser(); 
    this.otherUsers = this.userService.getOtherUsers(); 
    this.router.events.subscribe(() => { 
      const currentRoute = this.router.url.split('/').pop(); 
      this.selectedUser = currentRoute !== this.currentUser.username ? currentRoute : null; 
    }); 
  }
}
