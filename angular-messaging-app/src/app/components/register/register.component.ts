import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  username: string = ''; 
  password: string = ''; 
  constructor(private router: Router) {} 
  onSubmit(): void { 
    const users = JSON.parse(localStorage.getItem('users') || '[]'); 
    users.push({ username: this.username, password: this.password }); 
    localStorage.setItem('users', JSON.stringify(users)); 
    this.router.navigate(['/login']); 
  }
}
