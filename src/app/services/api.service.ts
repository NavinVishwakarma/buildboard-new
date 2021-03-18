import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { StorageService } from './storage.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  httpOptions: any;
  API_URL: string;
  TOKEN: any;
  ROLE: any;

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private router: Router,
    private event: EventService
  ) {
    this.API_URL = environment.BASE_API_ENDPOINT;
    this.TOKEN = this.storage.getDataField('token');
    // this.router.events.subscribe((res: any) => {
    //   if (res instanceof NavigationEnd || res instanceof NavigationStart) {
    //     this.TOKEN = this.storage.getDataField('token');
    //     this.ROLE = this.storage.getDataField('role');
    //   }
    // });
    this.event.isLogin.subscribe((res: boolean) => {
      this.TOKEN = this.storage.getDataField('token');
      this.ROLE = this.storage.getDataField('role');
      this.setHeader();
    });
    this.setHeader();
  }
  setHeader(): any {
    if (this.TOKEN !== undefined) {
      this.httpOptions = {
        headers: new HttpHeaders({
          // 'Content-Type': 'application/json',
          Accept: 'multipart/form-data',
          Authorization: 'Bearer' + ' ' + this.TOKEN,
        }),
      };
    } else {
      this.httpOptions = {
        headers: new HttpHeaders({
          // 'Content-Type': 'application/json',
          Accept: 'multipart/form-data',
        }),
      };
    }
  }

  private formatErrors(error: any): any {
    return throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http
      .get(`${this.API_URL}${path}`, {
        headers: this.httpOptions.headers,
        params,
      })
      .pipe(catchError(this.formatErrors));
  }

  post(path: any, body: object = {}): Observable<any> {
    return this.http
      .post(`${this.API_URL}${path}`, body, this.httpOptions)
      .pipe(catchError(this.formatErrors));
  }

  postMultiData(path: string, file: FormData): Observable<any> {
    const httpOptionsimg = {
      headers: new HttpHeaders({
        Accept: 'multipart/form-data',
      }),
    };
    return this.http
      .post(`${this.API_URL}${path}`, file, httpOptionsimg)
      .pipe(catchError(this.formatErrors));
  }
  postMultiDataWithtoken(path: string, file: FormData): Observable<any> {
    const httpOptionsimg = {
      headers: new HttpHeaders({
        Accept: 'multipart/form-data',
        Authorization: 'Bearer' + ' ' + this.TOKEN,
      }),
    };
    return this.http
      .post(`${this.API_URL}${path}`, file, httpOptionsimg)
      .pipe(catchError(this.formatErrors));
  }
  alert(message: string, type: any): any {
    return Swal.fire({
      title: message,
      icon: type,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
    });
  }
  // 'x-access-token': this.TOKEN !== undefined ? this.TOKEN : ''
}
