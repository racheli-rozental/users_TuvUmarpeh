import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../service/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports:[ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private userService:UsersService,private rout:Router) {
    this.registerForm = this.fb.group({
      IdNumber: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Address: ['', Validators.required],
      Phone: ['', Validators.required],
      City: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      BirthDate: ['', Validators.required],
      files: this.fb.array([])
    });
  }

  get files(): FormArray {
    return this.registerForm.get('files') as FormArray;
  }

  onFileChange(event: any, index: number) {
    const file: File = event.target.files[0]; // קבל את הקובץ הראשון שנבחר
    const fileArray = this.registerForm.get('files') as FormArray;
  
    // ודא שהמיקום קיים ב-FormArray
    if (file) {
      if (fileArray.length > index) {
        fileArray.at(index).setValue(file); // עדכן את הקובץ במיקום המתאים
      } else {
        fileArray.insert(index, new FormControl(file)); // הוסף את הקובץ למיקום המתאים
      }
    } else {
      console.warn(`No file selected for index ${index}`);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('IdNumber', this.registerForm.value.IdNumber);
    formData.append('FirstName', this.registerForm.value.FirstName);
    formData.append('LastName', this.registerForm.value.LastName);
    formData.append('Address', this.registerForm.value.Address);
    formData.append('Phone', this.registerForm.value.Phone);
    formData.append('City', this.registerForm.value.City);
    formData.append('Email', this.registerForm.value.Email);
    formData.append('BirthDate', this.registerForm.value.BirthDate);

    // הוספת קבצים ל-FormData
    this.files.controls.forEach((control, index) => {
      formData.append('files', control.value);
    });

    // שליחת הבקשה לשרת
    this.userService.register(formData).subscribe({
      next: (response) => {
        console.log('User created successfully:', response);
        this.rout.navigate(['/']);

      },
      error: (error) => {
        console.error('Error creating user:', error);
      }
    });
  }
}
