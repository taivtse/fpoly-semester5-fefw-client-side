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

  getActiveChatBoxModel(): ChatBoxModel {
    let activeChatItemIndex = 0;
    this.getActiveChatItemIndex().subscribe(index => activeChatItemIndex = index).unsubscribe();
    return this.chatBoxModels[activeChatItemIndex];
  }

  getChatBoxModelByProviderId(providerId: string): ChatBoxModel {
    for (const chatBoxModel of this.chatBoxModels) {
      if (chatBoxModel.chatBoxParam === providerId) {
        return chatBoxModel;
      }
    }

    return null;
  }

  setActiveChatBoxModel(chatBoxModel: ChatBoxModel): void {
    let activeChatItemIndex = 0;
    this.getActiveChatItemIndex().subscribe(index => activeChatItemIndex = index).unsubscribe();
    this.chatBoxModels[activeChatItemIndex] = chatBoxModel;
  }

  getActiveChatItemIndex(): Observable<number> {
    return this.activeChatItemIndex.asObservable();
  }

  changeActiveChatItemIndex(index: number): void {
    this.activeChatItemIndex.next(index);
  }

  changeActiveChatItemincreaseOne(): void {
    let activeChatItemIndex = 0;
    this.getActiveChatItemIndex().subscribe(index => activeChatItemIndex = index).unsubscribe();
    this.activeChatItemIndex.next(activeChatItemIndex + 1);
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

  moveChatItemToTop(chatItemIndex: number): void {
    let activeChatItemIndex = 0;
    this.getActiveChatItemIndex().subscribe(index => activeChatItemIndex = index).unsubscribe();

    if (chatItemIndex === -1 || chatItemIndex > this.chatBoxModels.length) {
      return;
    }

    const temp = this.chatBoxModels[chatItemIndex];
    this.chatBoxModels.splice(chatItemIndex, 1);
    this.chatBoxModels.unshift(temp);

    if (activeChatItemIndex < chatItemIndex) {
      this.changeActiveChatItemIndex(activeChatItemIndex + 1);
    } else if (activeChatItemIndex === chatItemIndex) {
      this.changeActiveChatItemIndex(0);
    }
  }

}
