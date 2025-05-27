import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../service/users.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navigate',
  imports: [MatIconModule],
  templateUrl: './navigate.component.html',
  styleUrl: './navigate.component.css'
})
export class NavigateComponent {
  token: string | null = null;

  constructor(private router: Router, private userService: UsersService,private cd: ChangeDetectorRef) {
  }
   ngOnInit() {
    this.token = sessionStorage.getItem('jwtToken');
    this.userService.login$.subscribe(() => {
      this.token = sessionStorage.getItem('jwtToken');
    });
  }


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

   refreshToken() {
    this.token = sessionStorage.getItem('jwtToken');
    this.cd.detectChanges();
  }
}


