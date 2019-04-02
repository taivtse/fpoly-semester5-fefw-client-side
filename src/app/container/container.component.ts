import {Component, OnInit} from '@angular/core';
import {UserService} from '../login/user.service';
import {AuthService} from 'angularx-social-login';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  public data: any;
  public userData: any;

  constructor(
    public user: UserService,
    public socialAuthService: AuthService,
    public route: ActivatedRoute
  ) {
    this.userData = this.user.getData();
  }

  ngOnInit() {
    this.user.sessionOut();
  }

  logout() {
    this.socialAuthService.signOut().then(data => {
      this.user.logOut();
    });
  }

}
