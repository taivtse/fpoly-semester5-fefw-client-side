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
        } else {
          this.loadChatBoxDataItemsAndRouting();
          this.isFinishCheckSessionIn = true;
        }
      })
      .catch((err) => {
        console.log(err);
        this.router.navigateByUrl('');
      });
  }

  loadChatBoxDataItemsAndRouting(): void {
    this.homeService.loadChatBoxDataItems()
      .then(() => {
        if (this.chatDataItemService.chatBoxModels.length > 0) {
          if (this.router.url === '/chat/loading') {
            this.router.navigate(['/chat', this.chatDataItemService.chatBoxModels[0].chatBoxParam]);
            this.chatDataItemService.changeActiveChatItemIndex(0);
          } else {
            let isExistChatBoxParam = false;
            const chatBoxParam = this.router.url.substring('/chat/'.length);

            for (const chatBoxModel of this.chatDataItemService.chatBoxModels) {
              if (chatBoxParam === chatBoxModel.chatBoxParam) {
                isExistChatBoxParam = true;
                break;
              }
            }

            if (!isExistChatBoxParam) {
              this.router.navigate(['/chat', this.chatDataItemService.chatBoxModels[0].chatBoxParam]);
              this.chatDataItemService.changeActiveChatItemIndex(0);
            }
          }
        }
      });
  }
}
