import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatDataItemService {
  chatItemIndex = new BehaviorSubject<number>(0);
  currentChatItemIndex = this.chatItemIndex.asObservable();

  constructor() {
  }

  changeActiveChatItemIndex(index: number): void {
    this.chatItemIndex.next(index);
  }

}
