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
  
  constructor(private userService: UserService) {} 
  
  ngOnInit() { 
    this.currentUser = this.userService.getCurrentUser(); 
    this.users = this.userService.getOtherUsers(); 
  } 
  selectUser(user: any) { 
    this.userSelected.emit(user); 
  }
}
