// import { MatIconModule } from '@angular/material/icon';
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
  
// idNumber: string | null;

constructor(private router: Router, private UserService: UsersService) {
    // this.idNumber = sessionStorage.getItem('userIdNumber');
    // console.log(this.idNumber);
}

// ngOnInit() {
//   this.UserService.userLoggedIn$.subscribe(role => {
//     this.userRole = role;
//   });
// }
// refreshComponent() {
//     this.idNumber = sessionStorage.getItem('userIdNumber'); // טען מחדש את ה-idNumber
//     console.log(this.idNumber); // הדפס את ה-idNumber החדש או בצע פעולות נוספות
// }




  onRegister() {
    this.router.navigate(['/register']);
  }

  
  onLogin() {
    this.router.navigate(['/']);
  }
  onActivity() {
    this.router.navigate(['/activity']);
  }
  onUpdate(){
    this.router.navigate(['/update']);
  }

 
}


