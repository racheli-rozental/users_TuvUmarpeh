import { Component } from '@angular/core';
import { LoginComponent } from "../login/login.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [LoginComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(  private router: Router) { }
register(){
  this.router.navigate(['/register']);
}
}
