import {Component, OnInit} from '@angular/core';
import {SharedData} from '../../shared/shared.data';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  private sharedData = SharedData;

  constructor() {
  }

  ngOnInit() {
  }

}
