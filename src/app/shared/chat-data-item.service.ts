import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ChatDataItem} from '../model/chat-data.item';

@Injectable({
  providedIn: 'root'
})
export class ChatDataItemService {
  isChatDataItemsLoaded = false;
  chatDataItemsNotify = new BehaviorSubject(null);
  chatDataItems: ChatDataItem[] = [];
  private activeChatItemIndex = new BehaviorSubject<number>(0);

  constructor() {
  }

  getActiveChatDataItem(): ChatDataItem {
    let activeChatItemIndex = 0;
    this.getActiveChatItemIndex().subscribe(index => activeChatItemIndex = index).unsubscribe();
    return this.chatDataItems[activeChatItemIndex];
  }

  getActiveChatItemIndex(): Observable<number> {
    return this.activeChatItemIndex.asObservable();
  }

  changeActiveChatItemIndex(index: number): void {
    this.activeChatItemIndex.next(index);
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
