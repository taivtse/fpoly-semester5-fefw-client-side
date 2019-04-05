import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HomeService} from './home.service';
import {SharedData} from '../shared/shared.data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router,
              private homeService: HomeService) {
  }

  ngOnInit() {
    if (!SharedData.isLoggedIn) {
      this.router.navigateByUrl('login');
    }
  }
}
