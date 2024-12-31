import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  // username: string = ''; 
  // password: string = ''; 
  // constructor(private router: Router) {} 
  // onSubmit(): void { 
  //   const users = JSON.parse(localStorage.getItem('users') || '[]'); 
  //   users.push({ username: this.username, password: this.password }); 
  //   localStorage.setItem('users', JSON.stringify(users)); 
  //   // this.router.navigate(['/login']); 
  // }

  // switchToLoginPage() { 
  //   this.router.navigate(['/login']); 
  // }

  registerForm: FormGroup; 
  hidePassword = true; 
  username: string = ''; 
  password: string = ''; 
  confirmPassword: string = ''; 
  hideConfirmPassword = true;
  constructor(private fb: FormBuilder,private router: Router) { 
    this.registerForm = this.fb.group({ 
      username: ['', Validators.required], 
      password: ['', Validators.required], 
      confirmPassword: ['', Validators.required] 
    }); 
  } 
  togglePasswordVisibility() { 
    this.hidePassword = !this.hidePassword; 
  } 

  toggleConfirmPasswordVisibility() { 
    this.hideConfirmPassword = !this.hideConfirmPassword; }
  onSubmit() { 
    if (this.password === this.confirmPassword) { 
      // Handle registration logic 
      console.log('Form submitted', this.username, this.password); 
    } else { 
      alert('Passwords do not match!'); 
    } 
  }

  switchToLoginPage() { 
    this.router.navigate(['/login']); 
  }
}
