import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../service/users.service';
import S3 from 'aws-sdk/clients/s3';



@Component({
  standalone: true,
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'], // תיקון כאן
})
export class RegisterComponent {
  registerForm: FormGroup;
  files: File[] = [];

  constructor(private fb: FormBuilder, private userService: UsersService, private router: Router) {
    this.registerForm = this.fb.group({
      IdNumber: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Address: ['', Validators.required],
      Phone: ['', Validators.required],
      City: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      BirthDate: ['', Validators.required]
    });
  }

  onFileChange(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.files[index] = input.files[0];
    }
  }

  async uploadFiles(): Promise<string[]> {
    const s3 = new S3({
      accessKeyId: 'YOUR_ACCESS_KEY', // יש להחליף
      secretAccessKey: 'YOUR_SECRET_KEY', // יש להחליף
      region: 'YOUR_REGION', // יש להחליף
    });

    const uploadPromises = this.files.map(file => {
      const params = {
        Bucket: 'YOUR_BUCKET_NAME', // יש להחליף
        Key: file.name,
        Body: file,
      };
      return s3.upload(params).promise();
    });

    const results = await Promise.all(uploadPromises);
    return results.map(result => result.Location); // מחזיר את ה-URLs של הקבצים שהועלו
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      const { IdNumber, FirstName, LastName, Address, Phone, City, Email, BirthDate } = this.registerForm.value;
      try {
        const fileUrls = await this.uploadFiles();
        console.log('Files uploaded:', fileUrls);
        this.userService.register({ IdNumber, FirstName, LastName, Address, Phone, City, Email, BirthDate,  }).subscribe({
          next: (res) => {
            console.log('Registration successful', res);
            this.router.navigate(['/']);
          },
          error: (err) => {
            console.error('Registration failed', err);
          }
        });
      } catch (error) {
        console.error('File upload failed', error);
      }
    }
  }
}
