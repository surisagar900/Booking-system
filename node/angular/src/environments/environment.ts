// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  serverUrl: 'http://localhost:3000/',
  moviesUrl: 'https://api.themoviedb.org/3/',
  movieApi: '?api_key=fe296a35c9124858ce7be7e5095283e9',
  posterUrl: 'http://image.tmdb.org/t/p/w342',
  // https://api.themoviedb.org/3/movie/550?api_key=fe296a35c9124858ce7be7e5095283e9
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
