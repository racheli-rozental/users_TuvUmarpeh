import { Component } from '@angular/core';
import { UsersService } from '../../service/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-get-activity',
  imports: [],
  templateUrl: './get-activity.component.html',
  styleUrl: './get-activity.component.css'
})
export class GetActivityComponent {
  activities:any;
  constructor(private userService:UsersService,private router:Router) {}
  getActivities(){
    try{
      this.userService.getActivities().subscribe((data)=>{
        this.activities=data;
      })
    }
    catch(e){
      console.log("error",e);
    }
  }
  viewCourseDetails(activityId:string){
    this.router.navigate(['/activity',activityId]);
  }
}
