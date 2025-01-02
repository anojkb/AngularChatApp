import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  getCurrentUser() { // Replace with your logic to get the current logged in user 
    return JSON.parse(localStorage.getItem('currentUser') || '{}'); 
  } 
  
  getOtherUsers() { 
    let users = JSON.parse(localStorage.getItem('users') || '[]'); 
    const currentUser = this.getCurrentUser(); 
    console.log("hI::",currentUser);
    return users.filter((user: any) => user.username !== currentUser.username); 
  }
}
