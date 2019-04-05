import {Component, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {Router} from '@angular/router';
import {SharedData} from '../shared/shared.data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService) {
  }

  ngOnInit() {
    if (SharedData.isLoggedIn) {
      this.router.navigateByUrl('chat');
    }
  }

  socialLogIn() {
    this.loginService.login()
      .then(() => {
        SharedData.isLoggedIn = true;
        this.router.navigateByUrl('chat');
      }).catch(err => {
      console.log(err);
      SharedData.isLoggedIn = false;
    });
  }

  socialLogOut(): void {
    this.loginService.logOut()
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
}
