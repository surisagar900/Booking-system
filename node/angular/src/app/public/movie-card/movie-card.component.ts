import { Component, Input, OnInit } from '@angular/core';
import { Movie, movies } from 'src/app/models/movies';
import { MoviesService } from 'src/app/services/movies.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent implements OnInit {
  @Input('data') movieData: Movie;

  constructor() {}

  ngOnInit(): void {}
}
