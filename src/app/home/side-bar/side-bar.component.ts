<<<<<<< HEAD
import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
=======
import {Component, OnInit} from '@angular/core';
>>>>>>> 240cca9f12d2bc4d8dbedc8df998077878964565
import {SharedData} from '../../shared/shared.data';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  @ViewChild('searchingInput') public searchingInput: ElementRef<HTMLInputElement>;

<<<<<<< HEAD
  isSearching = false;
  sharedData = SharedData;
=======
  private sharedData = SharedData;
>>>>>>> 240cca9f12d2bc4d8dbedc8df998077878964565

  constructor() {
  }

  ngOnInit() {
  }

  eventHandler(event) {
    console.log(event.code);
    if (event.code === 'Escape') {
      this.searchingInput.nativeElement.blur();
      this.searchingInput.nativeElement.value = '';
    }
  }

}
