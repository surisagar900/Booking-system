import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MoviesService } from 'src/app/services/movies.service';

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
    private route: ActivatedRoute
  ) {}

  loading: boolean = false;
  AddMovieForm: FormGroup;
  errors: string;
  addMovieSub: Subscription;
  currentYear: number = new Date().getFullYear();

  ngOnInit(): void {
    this.AddMovieForm = this.fb.group({
      title: [
        null,
        [Validators.required, Validators.pattern("^[0-9a-zA-Z: -']{1,60}$")],
      ],
      director: [
        null,
        [Validators.required, Validators.pattern('^[A-Za-z]{1,30}$')],
      ],
      language: [
        null,
        [Validators.required, Validators.pattern('^[A-Za-z]{1,30}$')],
      ],
      genre: [
        null,
        [Validators.required, Validators.pattern('^[A-Za-z]{1,30}$')],
      ],
      releaseYear: [
        null,
        [
          Validators.required,
          Validators.min(1800),
          Validators.max(this.currentYear),
        ],
      ],
      description: [
        null,
        [
          Validators.required,
          Validators.pattern("^[a-z0-9A-Z,./: '-?!@$%*&()]{10,500}$"),
        ],
      ],
      returnDays: [
        null,
        [Validators.required, Validators.min(1), Validators.max(30)],
      ],
      fine: [
        null,
        [Validators.required, Validators.min(1), Validators.max(1000)],
      ],
    });
  }

  onSubmit() {
    if (this.AddMovieForm.invalid) {
      return;
    }

    this.errors = '';
    this.loading = true;
    this.AddMovieForm.disable();

    this.addMovieSub = this.movieService
      .addMovie(this.AddMovieForm.value)
      .subscribe(
        () => {
          this.loading = false;
          this.AddMovieForm.enable();
          this.errors = '';
          this.AddMovieForm.reset();
        },
        (err) => {
          this.loading = false;
          this.errors = err;
          this.AddMovieForm.enable();
        },
        () => this.router.navigate(['.'], { relativeTo: this.route })
      );
  }

  ngOnDestroy() {
    if (this.addMovieSub) this.addMovieSub.unsubscribe();
  }
}
