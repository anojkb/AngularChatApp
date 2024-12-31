import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = ''; 
  password: string = ''; 
  constructor(private router: Router) {} 
  onSubmit(): void { 
    const users = JSON.parse(localStorage.getItem('users') || '[]'); 
    const user = users.find((u: { 
      username: string; password: string 
    }) => u.username === this.username && u.password === this.password); 
    if (user) { 
      localStorage.setItem('currentUser', JSON.stringify(user)); 
      this.router.navigate(['/contacts']); 
    } else { 
      alert('Invalid credentials'); 
    } 
  }

  switchToSignupPage() { 
    this.router.navigate(['/register']); 
  }
}
