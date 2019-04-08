import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {MessageDataItem} from '../../model/message-data.item';
import {ChatBoxDataItem} from '../../model/chat-box-data.item';
import {SharedData} from '../../shared/shared.data';
import {ChatBoxComponent} from './chat-box/chat-box.component';

@Component({
  selector: 'app-main-box',
  templateUrl: './main-box.component.html',
  styleUrls: ['./main-box.component.css']
})
export class MainBoxComponent implements OnInit {
  @ViewChild('chattingInput') private chattingInput: ElementRef<HTMLInputElement>;
  @ViewChild('chatBoxComponent') private chatBoxComponent: ChatBoxComponent;

  chatBoxParam: string;
  chatBoxDataItemMap = new Map<string, ChatBoxDataItem>();
  currentChatBoxDataItem: ChatBoxDataItem;

  constructor(private route: ActivatedRoute) {
    const message = new MessageDataItem();
    message.content = 'hello';
    message.date = new Date();
    message.cssClass = 'sent';
    message.tooltipPlacement = 'left';
    message.photoUrl = 'https://graph.facebook.com/982392238618347/picture?type=normal';
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
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.chatBoxParam = params.get('chatBoxParam');
      this.currentChatBoxDataItem = this.chatBoxDataItemMap.get(this.chatBoxParam);

      // focus and set the current typing message
      this.chattingInput.nativeElement.focus();
      this.chattingInput.nativeElement.value = this.getCurrentTypingMessageInChatBox();
    });
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
    this.progressAfterSendMessage();
  }

  progressAfterSendMessage() {
    this.chattingInput.nativeElement.focus();
    this.chattingInput.nativeElement.value = '';
    this.chatBoxComponent.scrollToBottom();
  }

  setCurrentTypingMessageInChatBox() {
    this.currentChatBoxDataItem.currentTypingMessage = this.chattingInput.nativeElement.value;
  }

  resetCurrentTypingMessageInChatBox() {
    this.currentChatBoxDataItem.currentTypingMessage = '';
  }

  getCurrentTypingMessageInChatBox(): string {
    return this.currentChatBoxDataItem.currentTypingMessage;
  }

  keyUpEventHandler(event) {
    this.setCurrentTypingMessageInChatBox();

    if (event.code === 'Enter') {
      this.sendMessage();
      this.resetCurrentTypingMessageInChatBox();
    }
  }
}
