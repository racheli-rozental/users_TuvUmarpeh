import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = "https://server-angular-tovumarpeh.onrender.com";
 
  private decodedToken: any | null = null;

  constructor(private http: HttpClient) {}

  // פונקציית התחברות ושמירת ה-JWT
  login(Email: string, IdNumber: Number): Observable<any> {
    console.log('Login request initiated with:', { IdNumber, Email });

    return this.http.post(`${this.apiUrl}/login`, { IdNumber, Email }).pipe(
      tap(
        (response: any) => {
          console.log('Server response:', response);

          if (response && response.token) { // עדכון המפתח ל-token
            try {
              sessionStorage.setItem('jwtToken', response.token); // שמירת ה-JWT ב-sessionStorage
              console.log('Token saved in sessionStorage:', sessionStorage.getItem('jwtToken'));
              this.decodedToken = jwtDecode(response.token); // פענוח ה-JWT ושמירתו
              console.log('Decoded token:', this.decodedToken);
            } catch (error) {
              console.error('Error saving token to sessionStorage:', error);
            }
          } else {
            console.warn('No token found in server response');
          }
        },
        (error) => {
          console.error('Error during login request:', error);
        }
      )
    );
  }

  // אחזור ה-JWT מ-sessionStorage
  getToken(): string | null {
    return sessionStorage.getItem('jwtToken');
  }

  // פענוח ה-JWT
  getDecodedToken(): any | null {
    if (!this.decodedToken) {
      const token = this.getToken();
      if (token) {
        try {
          this.decodedToken = jwtDecode(token);
        } catch (error) {
          console.error('Error decoding token:', error);
          this.decodedToken = null;
        }
      }
    }
    return this.decodedToken;
  }

  // בדיקה אם הטוקן פג תוקף
  isTokenExpired(): boolean {
    const decodedToken = this.getDecodedToken();
    if (decodedToken) {
      const currentTime = Math.floor(Date.now() / 1000); // זמן נוכחי בשניות
      return decodedToken.exp < currentTime;
    }
    return true;
  }

  // קבלת מספר הזהות מתוך ה-JWT
  getIdNumberFromToken(): string | null {
    const decodedToken = this.getDecodedToken();
  console.log(decodedToken.IdNumber);
    return decodedToken ? decodedToken.IdNumber || null : null;
  }

  // מחיקת ה-JWT מ-sessionStorage
  logout(): void {
    sessionStorage.removeItem('jwtToken');
    this.decodedToken = null;
  }

  // בדיקה אם המשתמש מחובר
  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired();
  }

  // פונקציות API עם הוספת ה-JWT לכותרות
  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    if (!token || this.isTokenExpired()) {
      console.error('Token is missing or expired.');
      throw new Error('Token is missing or expired.');
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // קבלת פרטי משתמש לפי מספר זהות
  getUser(IdNumber: Number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/users/${IdNumber}`, { headers });
  }

  // רישום משתמש חדש
  register(formData: FormData): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/users`, formData, { headers });
  }

  // עדכון פרטי משתמש
  updateUser(idNumber: number, formData: FormData): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/users/${idNumber}`, formData, { headers });
  }

  // רישום לפעילות
  registerForActivity(IdNumber: Number, activityId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/registerforactivity`, { IdNumber, activityId }, { headers });
  }

  // קבלת כל הפעילויות
  getActivities(): Observable<any> {
    const token = this.getToken();
    console.log('JWT Token:', token);

    if (!token || this.isTokenExpired()) {
      console.error('Token is missing or expired.');
      return throwError(() => new Error('Token is missing or expired.'));
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/activity`, { headers }).pipe(
      tap(
        (response) => {
          console.log('Activities:', response);
        },
        (error) => {
          console.error('Error fetching activities:', error);
        }
      )
    );
  }

  // קבלת פרטי פעילות לפי מזהה
  getActivity(activityId: Number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/activity/${activityId}`, { headers });
  }

  // רישום משתמש לפעילות
  registerActivity(id_number: number, activityId: number): Observable<any> {
    const enrollment = {
      IdActivities: activityId,
      IdNumber: id_number
    };
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/enroll`, enrollment, { headers });
  }
  downloadFileFromService(fileName: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/files/${fileName}`, { responseType: 'blob' });
}
}