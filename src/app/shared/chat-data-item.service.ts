import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ChatBoxModel} from '../model/chat-box.model';

@Injectable({
  providedIn: 'root'
})
export class ChatDataItemService {
  isChatDataItemsLoaded = false;
  chatDataItemsNotify = new BehaviorSubject(null);
  chatBoxModels: ChatBoxModel[] = [];
  private activeChatItemIndex = new BehaviorSubject<number>(0);

  constructor() {
  }

  getActiveChatDataItem(): ChatBoxModel {
    let activeChatItemIndex = 0;
    this.getActiveChatItemIndex().subscribe(index => activeChatItemIndex = index).unsubscribe();
    return this.chatBoxModels[activeChatItemIndex];
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

    const temp = this.chatBoxModels[activeChatItemIndex];
    this.chatBoxModels.splice(activeChatItemIndex, 1);
    this.chatBoxModels.unshift(temp);

    this.changeActiveChatItemIndex(0);
  }

}
