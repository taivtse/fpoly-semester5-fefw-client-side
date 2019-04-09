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

  getActiveChatItemIndex(): Observable<number> {
    return this.currentChatItemIndex.asObservable();
  }

  changeActiveChatItemIndex(index: number): void {
    this.currentChatItemIndex.next(index);
  }

  moveActiveChatItemToTop(): void {
    let activeChatItemIndex = 0;
    this.getActiveChatItemIndex().subscribe(index => activeChatItemIndex = index).unsubscribe();

    if (activeChatItemIndex === 0) {
      return;
    }

    const temp = this.chatDataItems[activeChatItemIndex];
    this.chatDataItems.splice(activeChatItemIndex, 1);
    this.chatDataItems.unshift(temp);

    this.changeActiveChatItemIndex(0);
  }

}
