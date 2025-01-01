import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup; 
  hidePassword = true; 
  username: string = ''; 
  password: string = ''; 
  confirmPassword: string = ''; 
  hideConfirmPassword = true;
  constructor(private fb: FormBuilder,private router: Router) {
  } 

  ngOnInit(): void {
    this.registerForm = this.fb.group({ 
      username: ['', [Validators.required, this.noWhitespaceValidator]], 
      password: [ '', [ Validators.required, Validators.minLength(6), 
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-= \[\] {};':"\\|,.<>\/?]).{6,}$/) 
        ] 
      ], 
      confirmPassword: ['', [Validators.required]] }, { validator: this.passwordMatchValidator });
  }
  onSubmit(): void { 
    if (this.registerForm.valid) { 
      const { username, password } = this.registerForm.value; 
      // Handle form submission, e.g., save user details 
      } 
    } 
    switchToLoginPage(): void { 
      this.router.navigate(['/login']); 
    } 
    noWhitespaceValidator(control) { 
      const isWhitespace = (control.value || '').trim().length === 0; const isValid = !isWhitespace; return isValid ? null : { 'noWhitespace': true }; 
    } 
    passwordMatchValidator(formGroup: FormGroup) { 
      
      const password = formGroup.get('password').value; 
      const confirmPassword = formGroup.get('confirmPassword').value; 
      if (password !== confirmPassword) { 
        formGroup.get('confirmPassword').setErrors({ mismatch: true }); } else { return null; } 
      } 
      togglePasswordVisibility() { 
        this.hidePassword = !this.hidePassword; 
      }
      
      toggleConfirmPasswordVisibility() { 
        this.hideConfirmPassword = !this.hideConfirmPassword; 
      }
}
