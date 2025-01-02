import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private router: Router) {} 

  showBackButton(): boolean { 
    const excludedRoutes = ['/login', '/register', '/contacts'];
    return !excludedRoutes.includes(this.router.url);
  } 

  showLogoutButton(): boolean { 
    const excludedRoutes = ['/login', '/register']; 
    return !excludedRoutes.includes(this.router.url); 
  }
  
  showAppText(): boolean { 
    const appTextRoutes = ['/login', '/register']; 
    return appTextRoutes.includes(this.router.url); 
  }

  goBack(): void { 
    window.history.back(); 
  } 

  logout(): void { 
    localStorage.removeItem('currentUser'); this.router.navigate(['/login']); 
  }
}
