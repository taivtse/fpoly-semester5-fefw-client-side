import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {StorageUtil} from './shared/storage.util';
import {ConstantData} from './shared/constant.data';
import {LoggedInUser} from './model/LoggedInUser';
import {SharedData} from './shared/shared.data';
import {UserAuthApiService} from './shared/user-auth-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Connect Now');

    SharedData.loggedInUser = StorageUtil.getLocalStorage(ConstantData.LOGGED_IN_USER_KEY) as LoggedInUser;

    if (SharedData.loggedInUser === null) {
      SharedData.loggedInUser = new LoggedInUser();
      SharedData.isLoggedIn = false;
    } else {
      SharedData.isLoggedIn = true;
    }
  }
}
