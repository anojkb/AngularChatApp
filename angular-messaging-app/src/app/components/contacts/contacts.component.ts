import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  standalone: false,
  
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent implements OnInit{
  contacts: Array<{ username: string }> = []; 
  constructor(private router: Router) {} 
  ngOnInit(): void { 
    this.contacts = JSON.parse(localStorage.getItem('users') || '[]'); 
  } 
  startChat(contact: { username: string }): void { 
    localStorage.setItem('selectedContact', JSON.stringify(contact)); this.router.navigate(['/chat']); 
  }
}
