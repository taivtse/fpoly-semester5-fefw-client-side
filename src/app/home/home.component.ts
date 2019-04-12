import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HomeService} from './home.service';
import {ChatDataItemService} from '../shared/chat-data-item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isFinishCheckSessionIn = false;

  constructor(private router: Router,
              private homeService: HomeService,
              private chatDataItemService: ChatDataItemService) {
  }

  ngOnInit() {
    this.homeService.checkSessionIn()
      .then(res => {
        if (res === false) {
          this.router.navigateByUrl('login');
        }
        this.isFinishCheckSessionIn = true;
      })
      .then(() => {
        this.loadChatBoxDataItemsAndRouting();
      })
      .catch((err) => {
        console.log(err);
        this.router.navigateByUrl('');
      });
  }

  loadChatBoxDataItemsAndRouting(): void {
    this.homeService.loadChatBoxDataItems()
      .then(() => {
        console.log(this.chatDataItemService.chatDataItems);
        if (this.chatDataItemService.chatDataItems.length > 0) {
          this.router.navigate([/chat/, this.chatDataItemService.chatDataItems[0].chatBoxParam]);
        }
      });
  }
}
