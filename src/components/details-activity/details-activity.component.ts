import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../service/users.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-details-activity',
  imports: [CommonModule,MatButtonModule,MatCardModule,MatIconModule],
  templateUrl: './details-activity.component.html',
  styleUrl: './details-activity.component.css'
})
export class DetailsActivityComponent {
  activity: any;
  constructor(private userService: UsersService, private route: ActivatedRoute,private router:Router) {}

  ngOnInit() {
    this.getActivityDetails();
  }

  getActivityDetails() {
    const activityId = this.route.snapshot.paramMap.get('id');
    if (activityId) {
      this.userService.getActivity(activityId).subscribe((data) => {
        this.activity = data;
      }, (error) => {
        console.log("error", error);
      });
    }
  }
  registerActivity() {
    const activityId = this.route.snapshot.paramMap.get('id');
    if (activityId) {
    this.router.navigate(['/registerActivity', activityId]);
    }
  }
}