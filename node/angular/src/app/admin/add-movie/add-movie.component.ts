import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { MoviesService } from 'src/app/services/movies.service';
import { isUndefined } from 'util';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styles: [],
})
export class AddMovieComponent implements OnInit, OnDestroy {
  constructor(
    private movieService: MoviesService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private loader: LoaderService
  ) {}

  loading: boolean = false;
  AddMovieForm: FormGroup;
  errors: string;
  addMovieSub: Subscription;
  currentYear: number = new Date().getFullYear();

  movieId: number = 0;

  ngOnInit(): void {
    this.initiateForm();

    this.route.params.subscribe((res) => {
      if (!isNaN(res['movieId'])) {
        this.movieId = res['movieId'];
        this.fillForm();
      }
    });
  }

  fillForm() {
    this.movieService
      .getMovieData(this.movieId)
      .toPromise()
      .then((res) => {
        this.AddMovieForm.setValue(res);
        this.imageSrc = '/assets/uploads/' + res.movieImg;
      });
  }

  initiateForm() {
    this.AddMovieForm = this.fb.group({
      movieId: [null],
      movieName: [
        null,
        [Validators.required, Validators.pattern("^[0-9a-zA-Z: -']{1,60}$")],
      ],
      moviePrice: [
        null,
        [Validators.required, Validators.min(120), Validators.max(1000)],
      ],
      movieDesc: [
        null,
        [
          Validators.required,
          Validators.pattern("^[a-z0-9A-Z,./: '-?!@$%*&()]{10,500}$"),
        ],
      ],
      movieRating: [
        1,
        [Validators.required, Validators.min(1), Validators.max(30)],
      ],
      movieImg: [null, [Validators.required]],
      moviePoster: ['poster'],
    });
  }

  fileError: string = null;
  imageSrc: string;

  fileUpload(file) {
    let fileData: File = file[0];
    this.fileError = '';
    this.imageSrc = '';

    const reader = new FileReader();

    if (fileData.size <= 2097152) {
      if (
        fileData.type == 'image/jpeg' ||
        fileData.type == 'image/png' ||
        fileData.type == 'image/jpg'
      ) {
        reader.readAsDataURL(fileData);
        reader.onload = () => {
          this.imageSrc = reader.result as string;
          this.AddMovieForm.patchValue({
            movieImg: fileData,
          });
          this.AddMovieForm.updateValueAndValidity();
        };
      } else {
        this.fileError =
          'please upload a valid image with format : jpg, jpeg, png';
      }
    } else {
      this.fileError = 'file size is greater than 2MB';
    }
  }

  onSubmit() {
    if (this.AddMovieForm.invalid) {
      return;
    }

    this.errors = '';
    this.loading = true;
    this.AddMovieForm.disable();

    this.loader.showLoader(true);

    let request: Observable<any>;
    if (this.movieId > 0) {
      request = this.movieService.editMovieData(this.AddMovieForm.value);
    } else {
      request = this.movieService.addMovieData(this.AddMovieForm.value);
    }

    this.addMovieSub = request.subscribe(
      (res) => {
        this.loading = false;
        this.loader.showLoader(false);
        this.AddMovieForm.enable();
        this.errors = '';
        this.AddMovieForm.reset();
        window.alert(res.message);
      },
      (err) => {
        this.loading = false;
        this.loader.showLoader(false);
        this.errors = err;
        this.AddMovieForm.enable();
        window.alert(err);
      },
      () => {
        let url = +this.movieId > 0 ? '../../' : '../';
        this.router.navigate([url], { relativeTo: this.route });
      }
    );
  }

  ngOnDestroy() {
    if (this.addMovieSub) this.addMovieSub.unsubscribe();
  }
}
