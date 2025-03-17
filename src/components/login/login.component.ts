import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../service/users.service'
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl:'./login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  alertMessage: string = '';
  alertType: string = 'error'; // אפשר 'success', 'info', או 'warning'
  
  
  
  constructor(private fb: FormBuilder, private userService: UsersService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      numberId: ['', [Validators.required]]
    });
  }
  showAlert(message: string, type: string): void {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => {
      this.alertMessage = ''; // מחיקת ההודעה אחרי 5 שניות
    }, 5000);
  }
  onLogin() {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value.email, this.loginForm.value.numberId).subscribe(
        response => {
          console.log('Login successful', response);
          this.router.navigate(['/activity']); 
        },
        error => {
          console.error('Login failed', error);
          this.showAlert('אינך רשום במערכת','faild');

         
        }
      );
    }
}

  
}