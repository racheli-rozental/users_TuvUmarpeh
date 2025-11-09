// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, FormArray, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
// import { UsersService } from '../../service/users.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-register',
//   imports:[ReactiveFormsModule],
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent {
//   selectedFiles: File[] = [];
//   registerForm: FormGroup;

//   constructor(private fb: FormBuilder, private userService:UsersService,private rout:Router) {
//     this.registerForm = this.fb.group({
//       IdNumber: ['', Validators.required],
//       FirstName: ['', Validators.required],
//       LastName: ['', Validators.required],
//       Address: ['', Validators.required],
//       Phone: ['', Validators.required],
//       City: ['', Validators.required],
//       Email: ['', [Validators.required, Validators.email]],
//       BirthDate: ['', Validators.required],
//       files: this.fb.array([])
//     });
//   }

//   get files(): FormArray {
//     return this.registerForm.get('files') as FormArray;
//   }

//   // onFileChange(event: any, index: number) {
//   //   const file: File = event.target.files[0]; // קבל את הקובץ הראשון שנבחר
//   //   const fileArray = this.registerForm.get('files') as FormArray;
  
//   //   // ודא שהמיקום קיים ב-FormArray
//   //   if (file) {
//   //     if (fileArray.length > index) {
//   //       fileArray.at(index).setValue(file); // עדכן את הקובץ במיקום המתאים
//   //     } else {
//   //       fileArray.insert(index, new FormControl(file)); // הוסף את הקובץ למיקום המתאים
//   //     }
//   //   } else {
//   //     console.warn(`No file selected for index ${index}`);
//   //   }
//   // }
//   // onFilesChange(event: any) {
//   //   const files: FileList = event.target.files;
//   //   const fileArray = this.registerForm.get('files') as FormArray;
    
//   //   // ננקה את הרשימה לפני שמוסיפים
//   //   fileArray.clear();
  
//   //   if (files && files.length > 0) {
//   //     for (let i = 0; i < files.length; i++) {
//   //       fileArray.push(new FormControl(files[i]));
//   //     }
//   //   } else {
//   //     console.warn('No files selected');
//   //   }
//   // }
//   onFilesChange(event: any) {
//     this.selectedFiles = Array.from(event.target.files);
//   }
  
//   downloadFile(fileName: string) {
//     this.userService.downloadFileFromService(fileName)
//       .subscribe((response: Blob) => {
//         const blob = new Blob([response]);
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = fileName; // שם הקובץ להורדה
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//         window.URL.revokeObjectURL(url);
//       }, error => {
//         console.error('Error downloading the file', error);
//       });
// }

// onSubmit() {
//   if (this.registerForm.invalid) {
//     return;
//   }

//   const formData = new FormData();
  
//   // הוספת שדות רגילים
//   formData.append('IdNumber', this.registerForm.value.IdNumber);
//   formData.append('FirstName', this.registerForm.value.FirstName);
//   formData.append('LastName', this.registerForm.value.LastName);
//   formData.append('Address', this.registerForm.value.Address);
//   formData.append('Phone', this.registerForm.value.Phone);
//   formData.append('City', this.registerForm.value.City);
//   formData.append('Email', this.registerForm.value.Email);
//   formData.append('BirthDate', this.registerForm.value.BirthDate);

//   // הוספת קבצים
//   this.selectedFiles.forEach(file => {
//     formData.append('files', file);
//   });

//   // שליחת הבקשה
//   this.userService.register(formData).subscribe({
//     next: (response) => {
//       console.log('User created successfully:', response);
//       this.rout.navigate(['/']);
//     },
//     error: (error) => {
//       console.error('Error creating user:', error);
//     }
//   });
// }

// }
// ...existing code...
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
  // במקום מערך פשוט - מיפוי של סוג קובץ -> File
  filesMap: Map<string, File> = new Map();
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

  // משתמשים בשיטה זו לכל input עם סוג מתאים
  onFileChange(event: any, type: string) {
    const file: File = event.target.files && event.target.files.length ? event.target.files[0] : null;
    if (file) {
      this.filesMap.set(type, file);
    } else {
      this.filesMap.delete(type);
    }
  }

  // אם יש לך עדיין single input שמקבל כמה קבצים, אפשר לבצע זיהוי לפי שם הקובץ:
  onFilesChangeAutoDetect(event: any) {
    const selected: File[] = Array.from(event.target.files || []);
    selected.forEach(file => {
      const name = file.name.toLowerCase();
      if (name.includes('med') || name.includes('medications')) this.filesMap.set('medications', file);
      else if (name.includes('agree')) this.filesMap.set('agreement', file);
      else if (name.includes('personal') || name.includes('personaldetails')) this.filesMap.set('personaldetails', file);
      else if (name.includes('id') || name.includes('identity')) this.filesMap.set('identity', file);
      else this.filesMap.set(`other_${file.name}`, file); // אופציונלי
    });
  }

  downloadFile(fileName: string) {
    this.userService.downloadFileFromService(fileName)
      .subscribe((response: Blob) => {
        const blob = new Blob([response]);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, error => {
        console.error('Error downloading the file', error);
      });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const formData = new FormData();

    // שדות רגילים
    formData.append('IdNumber', this.registerForm.value.IdNumber);
    formData.append('FirstName', this.registerForm.value.FirstName);
    formData.append('LastName', this.registerForm.value.LastName);
    formData.append('Address', this.registerForm.value.Address);
    formData.append('Phone', this.registerForm.value.Phone);
    formData.append('City', this.registerForm.value.City);
    formData.append('Email', this.registerForm.value.Email);
    formData.append('BirthDate', this.registerForm.value.BirthDate);

    // הוספת הקבצים לפי שמות שהשרת מצפה להם
    const expectedKeys = ['medications', 'agreement', 'personaldetails', 'identity'];
    expectedKeys.forEach(key => {
      const file = this.filesMap.get(key);
      if (file) formData.append(key, file, file.name);
    });

    // אם יש קבצים לא מזוהים (other_...) ניתן להוסיף גם אותם:
    this.filesMap.forEach((file, key) => {
      if (!expectedKeys.includes(key) && key.startsWith('other_')) {
        formData.append('files', file, file.name); // או שם שדה אחר לפי צרכים
      }
    });

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