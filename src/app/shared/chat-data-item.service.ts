import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ChatDataItem} from '../model/chat-data.item';

@Injectable({
  providedIn: 'root'
})
export class ChatDataItemService {
  chatDataItems: ChatDataItem[] = [];
  currentChatItemIndex = new BehaviorSubject<number>(0);

  constructor() {
  }

  getCurrentChatItemIndex(): Observable<number> {
    return this.currentChatItemIndex.asObservable();
  }

  changeActiveChatItemIndex(index: number): void {
    this.currentChatItemIndex.next(index);
  }

  moveCurrentActiveChatItemToTop(): void {
    let currentActiveChatItemIndex = 0;
    this.getCurrentChatItemIndex().subscribe(index => currentActiveChatItemIndex = index).unsubscribe();

    if (currentActiveChatItemIndex === 0) {
      return;
    }

    const temp = this.chatDataItems[currentActiveChatItemIndex];
    this.chatDataItems.splice(currentActiveChatItemIndex, 1);
    this.chatDataItems.unshift(temp);

    this.changeActiveChatItemIndex(0);
  }

}
