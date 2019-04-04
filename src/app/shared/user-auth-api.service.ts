import { Injectable } from '@angular/core';
import {LoggedInUser} from './shared.data';
import {ConstantData} from './constant.data';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserAuthApiService {

  constructor(private httpClient: HttpClient) { }

  public authenticateUser(loggedInUser: LoggedInUser): Promise<any> {
    const url = ConstantData.API_LOGIN_AUTH_ENDPOINT;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post(url, JSON.stringify(loggedInUser), {headers}).toPromise();
  }

  public updateAuthUserData(loggedInUser: LoggedInUser): Promise<any> {
    const url = ConstantData.API_LOGIN_ENDPOINT;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post(url, JSON.stringify(loggedInUser), {headers}).toPromise();
  }
}
