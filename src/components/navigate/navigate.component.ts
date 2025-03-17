// import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UsersService } from '../../service/users.service';

// import { MatToolbarModule } from '@angular/material/toolbar'
@Component({
  selector: 'app-navigate',
  imports: [],
  templateUrl: './navigate.component.html',
  styleUrl:'./navigate.component.css'
})
export class NavigateComponent  {
  

  constructor(private router: Router, private authService: UsersService) {}



  onRegister() {
    this.router.navigate(['/register']);
  }


  onLogin() {
    this.router.navigate(['/']);
  }
  onActivity() {
    this.router.navigate(['/activity']);
  }

 
}


