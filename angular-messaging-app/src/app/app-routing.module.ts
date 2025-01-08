import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { Authguard } from './services/authguard.service';
import { UserlistComponent } from './components/userlist/userlist.component';

// const routes: Routes = [
//   { path: 'register', component: RegisterComponent }, 
//   { path: 'login', component: LoginComponent }, 
//   { path: 'contacts', component: ContactsComponent, canActivate: [Authguard] }, 
//   { path: 'chat/:username', component: ChatComponent, canActivate: [Authguard] }, 
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
//   { path: '**', component: PagenotfoundComponent }
// ];

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'contacts',
    component: ContactsComponent,
    canActivate: [Authguard],
    children: [
      { path: '', component: UserlistComponent }, // Display user list by default
      { path: 'chat/:username', component: ChatComponent } // Display chat when a user is selected
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
