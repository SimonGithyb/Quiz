import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { AbstractService } from "./abstract.service";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient,
    private superServ: AbstractService) { }

  getQuestion() {
    const headers = this.superServ.getHeader();
    return this.superServ.getConfig()
      .pipe(mergeMap(config => this.http.get(config["serverUrl"] + `/`, { headers })),
        catchError((err) => {
          console.error(err);
          return this.handleError(err);
        }));
  }

  getAnswer() {
    const headers = this.superServ.getHeader();
    return this.superServ.getConfig()
      .pipe(mergeMap(config => this.http.get(config["serverUrl"] + `/`, { headers })),
        catchError((err) => {
          console.error(err);
          return this.handleError(err);
        }));
  }

  handleError(error: HttpErrorResponse) {
    if (error['status'] === 400) {
      let message: string = error.error.message || error.error;
      if (message.indexOf('ECONNREFUSED') === 0) {
        message = 'Cant got data in this time';
        console.log(`ERROR: ${message}`);
        return throwError(() => new Error(message));
      }
    }
    return this.superServ.handleError(error);
  }
}
