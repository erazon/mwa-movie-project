// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_BASE_URL: "http://localhost:3000/api/",
  AUTH_TOKEN_KEY: "access_token",
  MSG_CAST_INSERT_FAIL: "Cast add failed",
  MSG_CAST_INSERT_SUCCESS: "Cast added",
  MSG_CAST_UPDATE_FAIL: "Cast update failed",
  MSG_CAST_UPDATE_SUCCESS: "Cast updated",
  MSG_DELETE_FAIL: "Delete failed",
  MSG_MOVIE_INSERT_FAIL: "Movie add failed",
  MSG_MOVIE_INSERT_SUCCESS: "Movie added",
  MSG_MOVIE_UPDATE_FAIL: "Movie update failed",
  MSG_MOVIE_UPDATE_SUCCESS: "Movie updated",
  TITLE_ADD: "Add",
  TITLE_UPDATE: "Update",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
