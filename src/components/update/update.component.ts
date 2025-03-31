// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { UsersService } from '../../service/users.service';

// @Component({
//   selector: 'app-update',
//   imports: [ReactiveFormsModule],
//   templateUrl: './update.component.html',
//   styleUrl: './update.component.css'
// })
// export class UpdateComponent {
//   updateForm: FormGroup;
//    numberId = Number(sessionStorage.getItem('userIdNumber'));
//   constructor(private fb: FormBuilder, private userService: UsersService, private router: Router) {
//     this.updateForm = this.fb.group({
//       IdNumber: [this.numberId],
//       FirstName: ['', Validators.required],
//       LastName: ['', Validators.required],
//       Address: ['', Validators.required],
//       Phone: ['', Validators.required],
//       City: ['', Validators.required],
//       Email: ['', [Validators.required, Validators.email]],
//       BirthDate: ['', Validators.required]
//     });

//     // כאן תוכל לטעון את פרטי המשתמש הקיימים
//     this.loadUserData();
//   }

//   loadUserData() {
   
//     this.userService.getUser(this.numberId).subscribe(user => {
//       this.updateForm.patchValue(user);
//     });
//   }

//   async onUpdate() {
//     if (this.updateForm.valid) {
//       const { IdNumber, FirstName, LastName, Address, Phone, City, Email, BirthDate } = this.updateForm.value;
//       this.userService.updateUser(this.numberId,{ IdNumber, FirstName, LastName, Address, Phone, City, Email, BirthDate }).subscribe({
//         next: (res) => {
//           console.log('Update successful', res);
//           this.router.navigate(['/']);
//         },
//         error: (err) => {
//           console.error('Update failed', err);
//         }
//       });
//     }
//   }
// }

import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../service/users.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-update',
  imports: [ReactiveFormsModule,MatIconModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
  updateForm: FormGroup;
  files: File[] = [];
  numberId!:string

  constructor(private fb: FormBuilder, private userService: UsersService, private router: Router) { 
    this.numberId  = this.userService.getIdNumberFromToken()||'';
    this.updateForm = this.fb.group({
      IdNumber: [Number(this.numberId)],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Address: ['', Validators.required],
      Phone: ['', Validators.required],
      City: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      BirthDate: ['', Validators.required],
      files: this.fb.array([]) // שדה עבור הקבצים
    });

    this.loadUserData();
  }

  loadUserData() {
    this.userService.getUser(Number(this.numberId)).subscribe(user => {
      this.updateForm.patchValue(user);
    });
  }

  onFileChange(event: any, index: number) {
    const file: File = event.target.files[0];
    const fileArray = this.updateForm.get('files') as FormArray;
  
    if (fileArray.length <= index) {
      fileArray.push(new FormControl(file));
    } else {
      fileArray.at(index).setValue(file);
    }
  }
  
  async onUpdate() {
    if (this.updateForm.valid) {
      const formData = new FormData();
      formData.append('IdNumber', this.updateForm.value.IdNumber);
      formData.append('FirstName', this.updateForm.value.FirstName);
      formData.append('LastName', this.updateForm.value.LastName);
      formData.append('Address', this.updateForm.value.Address);
      formData.append('Phone', this.updateForm.value.Phone);
      formData.append('City', this.updateForm.value.City);
      formData.append('Email', this.updateForm.value.Email);
      formData.append('BirthDate', this.updateForm.value.BirthDate);
  
      const filesControl = this.updateForm.get('files') as FormArray;
      if (filesControl && filesControl.length > 0) {
        for (let i = 0; i < filesControl.length; i++) {
          const file = filesControl.at(i).value;
          if (file) {
            formData.append('files', file);
          }
        }
      }
  
      this.userService.updateUser(Number(this.numberId), formData).subscribe({
        next: (res) => {
          console.log('Update successful', res);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Update failed', err);
        }
      });
    }
  }
  
  
}