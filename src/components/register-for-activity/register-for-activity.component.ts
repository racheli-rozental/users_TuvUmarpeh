// import { Component, OnInit } from '@angular/core';
// import { UsersService } from '../../service/users.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-register-for-activity',
//   imports: [ReactiveFormsModule],
//   templateUrl: './register-for-activity.component.html',
//   styleUrls: ['./register-for-activity.component.css']
// })
// export class RegisterForActivityComponent {
//   registerActivityForm!: FormGroup;

//   constructor(private userService: UsersService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
//     this.registerActivityForm = this.fb.group({
//       IdNumber: ['', Validators.required]
//     });
//   }

//   registerForActivity() {
//     const activityIdString = this.route.snapshot.paramMap.get('id');
//     const activityId = activityIdString ? Number(activityIdString) : null;

//     if (activityId) {
//       const idNumber = this.registerActivityForm.value.IdNumber;

//       this.userService.registerActivity(idNumber, activityId).subscribe(response => {
//         console.log('נרשמת בהצלחה:', response);
//         alert('נרשמת בהצלחה לפעילות');
//         this.router.navigate(['/activity']);
//       }, error => {
//         console.error('Error enrolling user:', error);
//         alert(error);
        
//       });
//     }
//   }
// }
///////////////////
import { Component } from '@angular/core';
import { UsersService } from '../../service/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-for-activity',
  imports: [ReactiveFormsModule],
  templateUrl: './register-for-activity.component.html',
  styleUrls: ['./register-for-activity.component.css']
})
export class RegisterForActivityComponent {
  registerActivityForm!: FormGroup;

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.registerActivityForm = this.fb.group({
      IdNumber: ['', Validators.required]
    });
  }

  registerForActivity() {
    const activityIdString = this.route.snapshot.paramMap.get('id');
    const activityId = activityIdString ? Number(activityIdString) : null;

    if (activityId) {
      const idNumber = this.registerActivityForm.value.IdNumber;

      this.userService.registerActivity(idNumber, activityId).subscribe(
        response => {
          console.log('נרשמת בהצלחה:', response);
          this.snackBar.open('נרשמת בהצלחה לפעילות!', 'סגור', {
            duration: 4000,
            panelClass: ['snackbar-success']
          });
          this.router.navigate(['/activity']);
        },
        error => {
          console.error('Error enrolling user:', error);
          this.snackBar.open('אירעה שגיאה בהרשמה לפעילות', 'סגור', {
            duration: 4000,
            panelClass: ['snackbar-error']
          });
        }
      );
    }
  }
}
