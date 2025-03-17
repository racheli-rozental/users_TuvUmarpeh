import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http:HttpClient) { }
  private apiUrl="http://localhost:5074"; 
  register(data: { 
    IdNumber: string, FirstName: string, LastName: string, Address: string, Phone: string, City: string, Email: string, BirthDate: string, 
  }) {
    return this.http.post(`${this.apiUrl}/users`, data);
  }
  registerForActivity(IdNumber:string,activityId:string){
    return this.http.post(`${this.apiUrl}/registerforactivity`, { IdNumber, activityId });
  }
  getActivities(){
    return this.http.get(`${this.apiUrl}/activity`);
  }
  getActivity(activityId:string){
    return this.http.get(`${this.apiUrl}/activity/${activityId}`);
  }
  registerActivity(id_number: number, activityId: number) {
    const enrollment = {
      idActivities: activityId,
      idNumber: id_number
      
    };
    console.log('enrollment:', enrollment);
    return this.http.post(`${this.apiUrl}/enroll`, enrollment);
  }
  login(email:string,IdNumber:string):Observable<any>{
  return this.http.post(`${this.apiUrl}/login`, { email, IdNumber });
  }}


