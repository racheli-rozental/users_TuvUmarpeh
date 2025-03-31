import { Component } from '@angular/core';
import { UsersService } from '../../service/users.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-get-activity',
  imports: [MatIconModule],
  templateUrl: './get-activity.component.html',
  styleUrl: './get-activity.component.css'
})
export class GetActivityComponent {
  activities:any;
  dateObject!:Date
  today!:Date
 
 
  constructor(private userService:UsersService,private router:Router) {
    //  this.today=new Date().getDate()+"/"+new Date().getMonth()+"/"+new Date().getFullYear()
    }

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
  isLater(dateActivity: string) {
    const [day1, month1, year1] = dateActivity.split('-').map(Number);
    const date1=new Date(day1,month1,year1);
    this. today = new Date(); 
    return date1> this.today; 
}



}
