import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UsersService } from '../../service/users.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navigate',
  imports: [MatIconModule],
  templateUrl: './navigate.component.html',
  styleUrl:'./navigate.component.css'
})
export class NavigateComponent  {
constructor(private router: Router, private UserService: UsersService) {}
  onRegister() {
    this.router.navigate(['/register']);
  }

  
  onLogin() {
    this.router.navigate(['/login']);
  }
  onActivity() {
    this.router.navigate(['/activity']);
  }
  onUpdate(){
    this.router.navigate(['/update']);
  }

 
}


