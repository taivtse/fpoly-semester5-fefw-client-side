import {Component, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService) {
  }

  ngOnInit() {
    this.loginService.checkSessionIn()
      .then(res => {
        if (res === true) {
          this.router.navigateByUrl('chat');
        }
      });
  }

  socialLogIn() {
    this.loginService.login()
      .then(() => {
        this.router.navigateByUrl('chat');
      }).catch(err => console.log(err));
  }

  socialLogOut(): void {
    this.loginService.logOut()
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
}
