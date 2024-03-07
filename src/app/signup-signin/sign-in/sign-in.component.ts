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
  imports: [ReactiveFormsModule,CommonModule],
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
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.signinForm.reset();
    this.signinForm.controls['remember'].patchValue(false);
  }

  signin() {
    let userData: any = JSON.parse(localStorage.getItem('user_details') || '');
    if (
      this.signinForm.get('email')?.value == 'shivamshokeen67@gmail.com' &&
      this.signinForm.get('password')?.value == 'superadmin@A1'
    ) {
      localStorage.setItem(
        'user_details',
        JSON.stringify(this.signinForm.value)
      );
      this.router.navigate(['/dashboard']);
    }

    if (
      userData != '' &&
      this.signinForm.get('email')?.value == userData.email &&
      this.signinForm.get('password')?.value == userData.password
    ) {
      this.router.navigate(['/dashboard']);
      if (this.signinForm.get('remember')?.value == false) {
        localStorage.removeItem('user_details');
      }
    } else {
      this.toast.error('Invalid Credentails');
    }
  }

  redirect() {
    this.router.navigate(['/sign-up']);
  }
}
