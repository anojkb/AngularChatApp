import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-contacts',
  standalone: false,
  
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})

export class ContactsComponent implements OnInit { 
  currentUser: any; 
  otherUsers: any[] = []; 
  selectedUser: any;

  constructor(private userService: UserService, private router: Router) {} 

  ngOnInit(): void { 
    this.currentUser = this.userService.getCurrentUser(); 
    this.otherUsers = this.userService.getOtherUsers(); 
  }

  onUserSelected(user: any) { 
    this.selectedUser = user;
    console.log("selected user contact::",this.selectedUser);
    this.router.navigate(['/contacts/chat', user.username]); 
    
  }
}
