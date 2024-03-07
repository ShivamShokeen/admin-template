import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup = this.fb.group({
    username: [
      null,
      [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)],
    ],
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
    policy: [null, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.signupForm.reset();
    this.signupForm.controls['policy'].patchValue(false);
  }

  signup() {
    console.log('data', this.signupForm.value);
    console.log('email', this.signupForm.get('email')?.value);
    if (this.signupForm.valid) {
      localStorage.setItem('user_details', JSON.stringify(this.signupForm.value));
       this.router.navigate(['/sign-in']);
    }
  }

  redirect() {
    this.router.navigate(['/sign-in']);
  }
}
