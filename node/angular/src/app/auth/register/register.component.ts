import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  loading: boolean = false;
  hide: boolean = true;
  UserRole: string;
  RegisterForm: FormGroup;
  errors: string;
  registerSub: Subscription;

  ngOnInit(): void {
    this.RegisterForm = this.fb.group({
      id: [0],
      username: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(25),
          Validators.pattern('^[0-9a-z]{6,25}$'),
        ],
      ],
      firstname: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(30),
          Validators.pattern('^[A-Za-z]{1,30}$'),
        ],
      ],
      lastname: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(30),
          Validators.pattern('^[A-Za-z]{1,30}$'),
        ],
      ],
      email: [
        null,
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._]+@[a-z0-9.-]+.[a-z]{2,}$'),
        ],
      ],
      phone: [
        null,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]{10}$'),
        ],
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z0-9@*#]{8,20}$'),
        ],
      ],
    });
  }

  onSubmit() {
    if (this.RegisterForm.invalid) {
      return;
    }

    this.errors = '';
    this.loading = true;
    this.RegisterForm.disable();

    this.registerSub = this.authService
      .register(this.RegisterForm.value)
      .subscribe(
        () => {
          this.loading = false;
          this.RegisterForm.enable();
          this.errors = '';
          this.RegisterForm.reset();
        },
        (err) => {
          this.loading = false;
          this.errors = err;
          this.RegisterForm.enable();
        },
        () => this.router.navigate(['/'])
      );
  }
}
