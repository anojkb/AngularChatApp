import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users = [ 
      { username: 'currentuser' }, 
      { username: 'user1' },
      { username: 'user2' } 
  ];
  
  getCurrentUser() { 
    return this.users[0]; // Assuming the first user is the current user 
  } 
  getOtherUsers() { 
    return this.users.slice(1); // All users except the first one 
  }
}
