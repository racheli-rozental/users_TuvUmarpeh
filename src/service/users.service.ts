import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = "https://server-angular-tovumarpeh.onrender.com";
  private decodedToken: any | null = null;

  constructor(private http: HttpClient) {}

  // פונקציית התחברות ושמירת ה-JWT
  login(email: string, IdNumber: Number): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { IdNumber,email }).pipe(
      tap((response: any) => {
        if (response && response.Token) {
          sessionStorage.setItem('jwtToken', response.Token); // שמירת ה-JWT ב-sessionStorage
          this.decodedToken = jwtDecode(response.Token); // פענוח ה-JWT ושמירתו
        }
      })
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

  // קבלת מספר הזהות מתוך ה-JWT
  getIdNumberFromToken(): string | null {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken.IdNumber || null : null;
  }

  // מחיקת ה-JWT מ-sessionStorage
  logout(): void {
    sessionStorage.removeItem('jwtToken');
    this.decodedToken = null; // איפוס המידע המפוענח
  }

  // בדיקה אם המשתמש מחובר
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // פונקציות API עם הוספת ה-JWT לכותרות
  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getUser(IdNumber: Number) {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/users/${IdNumber}`, { headers });
  }

  register(formData: FormData) {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/users`, formData, { headers });
  }

  updateUser(idNumber: number, formData: FormData) {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/users/${idNumber}`, formData, { headers });
  }

  registerForActivity(IdNumber: Number, activityId: string) {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/registerforactivity`, { IdNumber, activityId }, { headers });
  }

  getActivities() {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/activity`, { headers });
  }

  getActivity(activityId: Number) {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/activity/${activityId}`, { headers });
  }

  registerActivity(id_number: number, activityId: number) {
    const enrollment = {
      IdActivities: activityId,
      IdNumber: id_number
    };
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/enroll`, enrollment, { headers });
  }
}