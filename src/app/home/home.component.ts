import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HomeService} from './home.service';
import {SharedData} from '../shared/shared.data';
import {UserAuthApiService} from '../shared/user-auth-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router,
              private homeService: HomeService,
              private userAuthApiService: UserAuthApiService) {
  }

  ngOnInit() {
    if (!SharedData.isLoggedIn) {
      this.userAuthApiService.authenticateUser(SharedData.loggedInUser)
        .then(isSuccess => {
          SharedData.isLoggedIn = isSuccess;
          if (!isSuccess) {
            this.router.navigateByUrl('login');
          }
        });
    }
  }
}
