import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-userlist',
  standalone: false,
  
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.scss'
})
export class UserlistComponent {
  @Output() userSelected = new EventEmitter<any>(); 
  users: any[] = []; 
  currentUser: any; 
  selectedUser: any;
  
  constructor(private userService: UserService) {} 
  
  ngOnInit() { 
    this.currentUser = this.userService.getCurrentUser(); 
    this.users = this.userService.getOtherUsers(); 
  } 
  selectUser(user: any) { 
    console.log("user::",user);
    this.userSelected.emit(user); 
    console.log("userSelected::",this.userSelected);
    this.selectedUser = user;
  }

   
}
