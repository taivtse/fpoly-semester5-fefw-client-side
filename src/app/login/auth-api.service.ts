import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private httpClient: HttpClient) {
  }

  postData(credentials) {
    return new Promise((resolve, reject) => {
      const url = 'http://localhost:4200/login';
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      this.httpClient.post(url, JSON.stringify(credentials), {headers})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
