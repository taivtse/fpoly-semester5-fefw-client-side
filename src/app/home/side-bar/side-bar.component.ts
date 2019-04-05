import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SharedData} from '../../shared/shared.data';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  @ViewChild('searchingInput') public searchingInput: ElementRef<HTMLInputElement>;

  isSearching = false;
  sharedData = SharedData;

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
