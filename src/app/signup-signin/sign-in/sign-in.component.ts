import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent implements OnInit {
  signinForm: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [
      null,
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        ),
      ],
    ],
    remember: false,
    role: null,
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.formReset();
  }

  formReset() {
    this.signinForm.reset();
    this.signinForm.controls['remember'].patchValue(false);
    this.signinForm.controls['role'].patchValue('user');
  }

  fillCred(data: any) {
    if (data?.value == 'superadmin') {
      this.formReset();
      this.signinForm.patchValue({
        email: 'shivamshokeen67@gmail.com',
        password: 'superadmin@A1',
        role: 'superadmin',
        remember: true,
      });
    }

    if (data?.value == 'admin') {
      this.formReset();
      this.signinForm.patchValue({
        email: 'sam@any.com',
        password: 'superadmin@A1',
        role: 'admin',
        remember: true,
      });
    }
    if (data?.value == 'clear') {
      this.formReset();
    }
  }

  signin() {
    let item = localStorage.getItem('user_details');
    let userData: any = null;
    if (item != null) {
      userData = JSON.parse(item);
    }
    if (
      (this.signinForm.get('email')?.value == 'shivamshokeen67@gmail.com' &&
        this.signinForm.get('password')?.value == 'superadmin@A1') ||
      (this.signinForm.get('email')?.value == 'sam@any.com' &&
        this.signinForm.get('password')?.value == 'superadmin@A1')
    ) {
      localStorage.setItem(
        'user_details',
        JSON.stringify(this.signinForm.value)
      );
      this.router.navigate(['/dashboard']);
      this.formReset();
    } else if (
      userData != null &&
      this.signinForm.get('email')?.value == userData?.email &&
      this.signinForm.get('password')?.value == userData?.password
    ) {
      if (this.signinForm.get('remember')?.value == false) {
        localStorage.removeItem('user_details');
      }
      this.router.navigate(['/dashboard']);
      this.formReset();
    } else {
      this.toast.error('Invalid Credentails');
    }
  }

  redirect() {
    this.router.navigate(['/sign-up']);
  }
}
