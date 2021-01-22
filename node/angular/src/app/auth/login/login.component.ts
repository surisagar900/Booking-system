import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide: boolean = true;
  errors: string;
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.initiateForm();
  }

  private initiateForm() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.pattern('^[a-z0-9]{6,25}$'),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z0-9@*#]{8,20}$'),
      ]),
    });
  }

  onSubmit(isAdmin: boolean = false) {
    if (this.loginForm.invalid) {
      return;
    }

    this.errors = '';
    this.loading = true;
    this.loginForm.disable();
    this.authService
      .login(
        this.loginForm.value.username,
        this.loginForm.value.password,
        isAdmin
      )
      .subscribe(
        (res) => {
          this.loading = false;
          this.loginForm.enable();
          this.errors = '';
          this.loginForm.reset();
          if (res.role == 2) {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/']);
          }
        },
        (err) => {
          this.loading = false;
          this.errors = err;
          this.loginForm.enable();
        }
      );
  }
}
