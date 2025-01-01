import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  username: string = ''; 
  password: string = ''; 
  loginForm !: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {} 

  ngOnInit(): void { 
    this.loginForm = this.fb.group({ 
      username: ['', [Validators.required, this.noWhitespaceValidator]], 
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-= \[\] {};':"\\|,.<>\/?]).{8,}$/)]] 
    }); 
  }

  onSubmit(): void { 
    // const users = JSON.parse(localStorage.getItem('users') || '[]'); 
    // const user = users.find((u: { 
    //   username: string; password: string 
    // }) => u.username === this.username && u.password === this.password); 
    // if (user) { 
    //   localStorage.setItem('currentUser', JSON.stringify(user)); 
    //   this.router.navigate(['/contacts']); 
    // } else { 
    //   alert('Invalid credentials'); 
    // } 

    if (this.loginForm.valid) { 
      const { username, password } = this.loginForm.value; 
      const users = JSON.parse(localStorage.getItem('users') || '[]'); 
      const user = users.find((u: { username: string; password: string }) => u.username === username && u.password === password); 
      if (user) { 
        localStorage.setItem('currentUser', 
        JSON.stringify(user)); this.router.navigate(['/contacts']); 
      } 
      else { alert('Invalid credentials'); } 
    }
  }

  switchToSignupPage() { 
    this.router.navigate(['/register']); 
  }

  noWhitespaceValidator(control: { value: any; }) { 
    const isWhitespace = (control.value || '').trim().length === 0; 
    const isValid = !isWhitespace; return isValid ? null : { 'noWhitespace': true }; 
  }
}
