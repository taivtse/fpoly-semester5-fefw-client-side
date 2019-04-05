import {Injectable} from '@angular/core';
import {SharedData} from '../shared/shared.data';
import {UserAuthApiService} from '../shared/user-auth-api.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private userAuthApiService: UserAuthApiService) {
  }

  checkSessionIn(): Promise<any> {
    return this.userAuthApiService.authenticateUser(SharedData.loggedInUser);
  }
}
