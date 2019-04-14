import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SharedData} from '../../shared/shared.data';
import {SideBarService} from './side-bar.service';
import {SearchUserModel} from '../../model/search-user.model';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  @ViewChild('searchingInput') private searchingInput: ElementRef<HTMLInputElement>;
  searchUserModels: SearchUserModel[] = [];
  isSearching = false;
  sharedData = SharedData;

  constructor(private sideBarService: SideBarService) {
  }

  ngOnInit() {
  }

  keyUpEventHandler(event) {
    if (event.code === 'Escape') {
      this.searchingInput.nativeElement.blur();
      this.searchingInput.nativeElement.value = '';
    } else {
      const searchContent = this.searchingInput.nativeElement.value;
      if (searchContent.trim().length > 0) {
        this.sideBarService.loadSearchUser(searchContent).then(searchUserModels => {
          this.searchUserModels = (searchUserModels as SearchUserModel[]);
        });
      }
    }
  }

}
