import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  constructor(
    private userService: UsersService,
    private loader: LoaderService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  loading: boolean = false;
  hide: boolean = true;
  UserRole: string;
  RegisterForm: FormGroup;
  errors: string;
  registerSub: Subscription;

  ngOnInit(): void {
    this.userService.getUserData().subscribe((res) => {
      this.loading = true;
      this.initiateForm();
      this.RegisterForm.patchValue({
        id: res.id,
        username: res.username,
        firstname: res.firstname,
        lastname: res.lastname,
        email: res.email,
        phone: res.phone,
      });
    });
  }

  initiateForm() {
    this.RegisterForm = this.fb.group({
      id: [0],
      username: [
        { value: null, disabled: true },
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

    this.loader.showLoader(true);

    this.registerSub = this.userService
      .editUserData(this.RegisterForm.getRawValue())
      .subscribe(
        () => {
          this.loader.showLoader(false);
          this.RegisterForm.enable();
          this.errors = '';
          this.RegisterForm.reset();
        },
        (err) => {
          this.loader.showLoader(false);
          this.errors = err;
          this.RegisterForm.enable();
        },
        () => this.router.navigate(['../'], { relativeTo: this.route })
      );
  }
}
