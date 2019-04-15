import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SharedData} from '../../shared/shared.data';
import {SideBarService} from './side-bar.service';
import {SearchUserModel} from '../../model/search-user.model';
import {Router} from '@angular/router';

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

  constructor(private sideBarService: SideBarService,
              private router: Router) {
  }

  ngOnInit() {
  }

  keyUpEventHandler(event) {
    if (event.code === 'Escape') {
      this.finishSearch();
    } else {
      const searchContent = this.searchingInput.nativeElement.value;
      if (searchContent.trim().length > 0) {
        this.sideBarService.loadSearchUser(searchContent).then(searchUserModels => {
          this.searchUserModels = (searchUserModels as SearchUserModel[]);
        });
      } else {
        this.searchUserModels = [];
      }
    }
  }

  addNewChatBox(index: number) {
    this.sideBarService.addOrRedirectChatBox(this.searchUserModels[index]);
    this.router.navigate(['/chat/', this.searchUserModels[index].providerId]);
    this.finishSearch();
  }

  private finishSearch() {
    this.searchingInput.nativeElement.blur();
    this.searchingInput.nativeElement.value = '';
    this.searchUserModels = [];
    this.isSearching = false;
  }
}
