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
    const chatDataItem1 = new ChatDataItem();
    chatDataItem1.name = 'Võ Thành Tài';
    chatDataItem1.photoUrl = 'https://scontent.fsgn5-4.fna.fbcdn.net/v/t1.0-1/p100x100/47288746_914790362045202_3910511029439692800_n.jpg?_nc_cat=104&_nc_ht=scontent.fsgn5-4.fna&oh=40fbc7fda2f4a2ea46186fccc3bfa14e&oe=5D343857';
    chatDataItem1.lastMessageContent = 'Xin chao ban tai';
    chatDataItem1.lastMessageDate = new Date();
    chatDataItem1.chatBoxParam = '/chat/tai';
    this.chatDataItems.push(chatDataItem1);

    const chatDataItem2 = new ChatDataItem();
    chatDataItem2.name = 'Trần Hải My';
    chatDataItem2.photoUrl = 'https://scontent.fsgn5-7.fna.fbcdn.net/v/t1.0-1/p100x100/51585750_800173830329890_2939834964411154432_n.jpg?_nc_cat=103&_nc_ht=scontent.fsgn5-7.fna&oh=e9508c84f440971e678c1d735cb055f6&oe=5D3ED5B3';
    chatDataItem2.lastMessageContent = 'Xin chao ban my';
    chatDataItem2.lastMessageDate = new Date();
    chatDataItem2.chatBoxParam = '/chat/my';
    this.chatDataItems.push(chatDataItem2);
  }

  getActiveChatDataItem(): ChatDataItem {
    let activeChatItemIndex = 0;
    this.getActiveChatItemIndex().subscribe(index => activeChatItemIndex = index).unsubscribe();
    return this.chatDataItems[activeChatItemIndex];
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
