import { Injectable } from '@angular/core';
import {ConstantData} from './constant.data';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserModel} from '../model/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UserAuthApiService {

  constructor(private httpClient: HttpClient) { }

  public authenticateUser(loggedInUser: UserModel): Promise<any> {
    const url = ConstantData.API_LOGIN_AUTH_ENDPOINT;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post(url, JSON.stringify(loggedInUser), {headers}).toPromise();
  }

  public updateAuthUserData(loggedInUser: UserModel): Promise<any> {
    const url = ConstantData.API_LOGIN_ENDPOINT;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post(url, JSON.stringify(loggedInUser), {headers}).toPromise();
  }
}
