import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  registerForm !: UntypedFormGroup; 
  hidePassword = true; 
  username: string = ''; 
  password: string = ''; 
  confirmPassword: string = ''; 
  hideConfirmPassword = true;

  constructor(private fb: UntypedFormBuilder,private router: Router) {  } 

  ngOnInit(): void {
    this.registerForm = this.fb.group({
        username: ['', [Validators.required, this.noWhitespaceValidator]],
        password: ['', [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/)
        ]],
        confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
}


// onSubmit(): void { 
//   if (this.registerForm.valid) { 
//     const { username, password } = this.registerForm.value;
//     let users = JSON.parse(localStorage.getItem('users') || '[]');
    
//     // Ensure users is an array
//     if (!Array.isArray(users)) {
//       users = [];
//     }

//     // Add the new user to the list
//     users.push({ username, password });
//     // Save the updated list
//     localStorage.setItem('users', JSON.stringify(users));
//     alert('Registration successful!');
//     this.router.navigate(['/login']); 
//   } 
// }

onSubmit(): void { 
  if (this.registerForm.valid) { 
    const { username, password } = this.registerForm.value;
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Ensure users is an array
    if (!Array.isArray(users)) {
      users = [];
    }

    // Check if the username already exists
    const userExists = users.some((user: any) => user.username === username);

    if (userExists) {
      alert('Username already exists. Please choose a different username.');
    } else {
      // Add the new user to the list
      users.push({ username, password });
      // Save the updated list
      localStorage.setItem('users', JSON.stringify(users));
      alert('Registration successful!');
      this.router.navigate(['/login']); 
    }
  }
}



    switchToLoginPage(): void { 
      this.router.navigate(['/login']); 
    } 

    noWhitespaceValidator(control: { value: any; }) { 
      const isWhitespace = (control.value || '').trim().length === 0; const isValid = !isWhitespace; return isValid ? null : { 'noWhitespace': true }; 
    } 

    passwordMatchValidator(formGroup: UntypedFormGroup) {
      const password = formGroup.get('password')?.value;
      const confirmPassword = formGroup.get('confirmPassword')?.value;
      if (password !== confirmPassword) {
        formGroup.get('confirmPassword')?.setErrors({ mismatch: true });
      } else {
        formGroup.get('confirmPassword')?.setErrors(null);
      }
      return null;
    }

      togglePasswordVisibility() { 
        this.hidePassword = !this.hidePassword; 
      }
      
      toggleConfirmPasswordVisibility() { 
        this.hideConfirmPassword = !this.hideConfirmPassword; 
      }
}
