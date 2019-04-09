import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
    const message = new MessageDataItem();
    message.content = 'hello';
    message.date = new Date();
    message.cssClass = 'sent';
    message.tooltipPlacement = 'left';
    message.photoUrl = 'https://scontent.fsgn5-4.fna.fbcdn.net/v/t1.0-1/p100x100/47288746_914790362045202_3910511029439692800_n.jpg?_nc_cat=104&_nc_ht=scontent.fsgn5-4.fna&oh=40fbc7fda2f4a2ea46186fccc3bfa14e&oe=5D343857';
    const chatbox: ChatBoxDataItem = new ChatBoxDataItem();
    chatbox.messageDataItems.push(message);
    this.chatBoxDataItemMap.set('tai', chatbox);

    const message1 = new MessageDataItem();
    message1.content = 'hi';
    message1.date = new Date();
    message1.cssClass = 'replies';
    message1.tooltipPlacement = 'right';
    message1.photoUrl = 'https://scontent.fsgn5-7.fna.fbcdn.net/v/t1.0-1/p100x100/51585750_800173830329890_2939834964411154432_n.jpg?_nc_cat=103&_nc_ht=scontent.fsgn5-7.fna&oh=e9508c84f440971e678c1d735cb055f6&oe=5D3ED5B3';
    const chatbox1: ChatBoxDataItem = new ChatBoxDataItem();
    chatbox1.messageDataItems.push(message1);
    this.chatBoxDataItemMap.set('my', chatbox1);

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.chatBoxParam = params.get('chatBoxParam');
      this.currentChatBoxDataItem = this.chatBoxDataItemMap.get(this.chatBoxParam);

      // focus and set the current typing message
      this.chattingInput.nativeElement.focus();
      this.chattingInput.nativeElement.value = this.getCurrentTypingMessageInChatInput();
    });

    // set active for the chat item
    this.chatDataItemService.changeActiveChatItemIndex(this.getChatItemIndex());
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
    let activeChatItemIndex = 0;
    this.chatDataItemService.getActiveChatItemIndex().subscribe(index => activeChatItemIndex = index).unsubscribe();
    this.chatDataItemService.chatDataItems[activeChatItemIndex].lastMessageContent = messageDataItem.content;
    this.chatDataItemService.chatDataItems[activeChatItemIndex].lastMessageDate = messageDataItem.date;
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
