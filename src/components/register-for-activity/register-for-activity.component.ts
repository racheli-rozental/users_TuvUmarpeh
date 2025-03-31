import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../service/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-for-activity',
  imports: [ReactiveFormsModule],
  templateUrl: './register-for-activity.component.html',
  styleUrls: ['./register-for-activity.component.css']
})
export class RegisterForActivityComponent {
  registerActivityForm!: FormGroup;

  constructor(private userService: UsersService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
    this.registerActivityForm = this.fb.group({
      IdNumber: ['', Validators.required]
    });
  }

  registerForActivity() {
    const activityIdString = this.route.snapshot.paramMap.get('id');
    const activityId = activityIdString ? Number(activityIdString) : null;

    if (activityId) {
      const idNumber = this.registerActivityForm.value.IdNumber;

      this.userService.registerActivity(idNumber, activityId).subscribe(response => {
        console.log('User enrolled successfully:', response);
        this.router.navigate(['/activity']);
      }, error => {
        console.error('Error enrolling user:', error);
        // כאן ניתן להוסיף הודעת שגיאה למשתמש
      });
    }
  }
}
