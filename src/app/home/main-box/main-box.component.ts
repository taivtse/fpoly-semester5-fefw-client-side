import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {MessageDataItem} from '../../model/message-data.item';
import {ChatBoxDataItem} from '../../model/chat-box-data.item';
import {SharedData} from '../../shared/shared.data';
import {ChatDataItemService} from '../../shared/chat-data-item.service';

@Component({
  selector: 'app-main-box',
  templateUrl: './main-box.component.html',
  styleUrls: ['./main-box.component.css']
})
export class MainBoxComponent implements OnInit {
  @ViewChild('chattingInput') private chattingInput: ElementRef<HTMLInputElement>;
  chatBoxParam: string;
  chatBoxDataItemMap = new Map<string, ChatBoxDataItem>();
  currentChatBoxDataItem: ChatBoxDataItem;

  constructor(private route: ActivatedRoute,
              private chatDataItemService: ChatDataItemService) {
  }

  ngOnInit() {
    this.chatDataItemService.chatDataItemsNotify.subscribe(() => {
      this.chatDataItemService.chatBoxModels.forEach(chatDataItem => {
        if (!this.chatBoxDataItemMap.has(chatDataItem.chatBoxParam)) {
          const chatBoxDataItem = new ChatBoxDataItem();
          chatBoxDataItem.id = chatDataItem.id;
          chatBoxDataItem.name = chatDataItem.name;
          chatBoxDataItem.photoUrl = chatDataItem.photoUrl;
          this.chatBoxDataItemMap.set(chatDataItem.chatBoxParam, chatBoxDataItem);
        }
      });

      if (this.chatDataItemService.isChatDataItemsLoaded) {
        this.route.paramMap.subscribe((params: ParamMap) => {
          // set current chat box data item
          this.chatBoxParam = params.get('chatBoxParam');
          this.currentChatBoxDataItem = this.chatBoxDataItemMap.get(this.chatBoxParam);

          // focus and set the current typing message
          this.chattingInput.nativeElement.focus();
          this.chattingInput.nativeElement.value = this.getCurrentTypingMessageInChatInput();
        });

        // set active for the chat item
        const activeChatItemIndex = this.getChatItemIndex();
        this.chatDataItemService.changeActiveChatItemIndex(activeChatItemIndex);
      }
    });
  }

  getChatItemIndex(): number {
    let index = -1;
    for (const key of Array.from(this.chatBoxDataItemMap.keys())) {
      index++;
      if (key === this.chatBoxParam) {
        return index;
      }
    }
    return -1;
  }

  sendMessage(): void {
    if (this.chattingInput.nativeElement.value === '') {
      return;
    }
    const messageDataItem = new MessageDataItem();
    messageDataItem.content = this.chattingInput.nativeElement.value;
    messageDataItem.date = new Date();
    messageDataItem.tooltipPlacement = 'left';
    messageDataItem.photoUrl = SharedData.loggedInUser.photoUrl;
    messageDataItem.cssClass = 'sent';

    this.chatBoxDataItemMap.get(this.chatBoxParam).messageDataItems.push(messageDataItem);
    this.progressAfterSendMessage(messageDataItem);
  }

  progressAfterSendMessage(messageDataItem: MessageDataItem) {
    this.chattingInput.nativeElement.focus();
    this.chattingInput.nativeElement.value = '';
    this.currentChatBoxDataItem.currentTypingMessage = '';

    //  set current chat item to top
    this.chatDataItemService.moveActiveChatItemToTop();

    //  set last message content and last message date in chat item
    this.chatDataItemService.chatBoxModels[0].lastMessageContent = messageDataItem.content;
    this.chatDataItemService.chatBoxModels[0].lastMessageDate = messageDataItem.date;
  }

  setCurrentTypingMessageInChatInput() {
    if (this.currentChatBoxDataItem) {
      this.currentChatBoxDataItem.currentTypingMessage = this.chattingInput.nativeElement.value;
    }
  }

  getCurrentTypingMessageInChatInput(): string {
    if (this.currentChatBoxDataItem) {
      return this.currentChatBoxDataItem.currentTypingMessage;
    }
    return '';
  }

  keyUpEventHandler(event) {
    this.setCurrentTypingMessageInChatInput();

    if (event.code === 'Enter') {
      this.sendMessage();
    }
  }
}
