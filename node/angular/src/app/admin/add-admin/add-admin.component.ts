import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css'],
})
export class AddAdminComponent implements OnInit {
  addAdminForm: FormGroup;
  hide: boolean = true;
  errors: string;
  loading: boolean = false;

  constructor(
    private userService: UsersService,
    private router: Router,
    private loader: LoaderService
  ) {}

  ngOnInit() {
    this.initiateForm();
  }

  private initiateForm() {
    this.addAdminForm = new FormGroup({
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

  onSubmit() {
    if (this.addAdminForm.invalid) {
      return;
    }

    this.errors = '';
    this.loader.showLoader(true);
    this.addAdminForm.disable();

    this.userService
      .addAdmin(
        this.addAdminForm.value.username,
        this.addAdminForm.value.password
      )
      .subscribe(
        (res) => {
          window.alert(res);
          this.loader.showLoader(false);
          this.addAdminForm.enable();
          this.errors = '';
          this.addAdminForm.reset();
        },
        (err) => {
          this.errors = err;
          window.alert(err);
          this.loader.showLoader(false);
          this.addAdminForm.enable();
        }
      );
  }
}
