import {AfterViewChecked, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ChatBoxDataItem} from '../../../model/chat-box-data.item';
import {ChatBoxService} from './chat-box.service';
import {MessageModel} from '../../../model/message.model';
import {MessageDataItem} from '../../../model/message-data.item';
import {SharedData} from '../../../shared/shared.data';
import {BeanUtil} from '../../../shared/bean.util';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit, AfterViewChecked, OnChanges {
  @Input() chatBoxDataItem: ChatBoxDataItem;
  @ViewChild('messagesWrapper') private messagesWrapper: ElementRef;
  private messageDataItemLength = 0;

  constructor(private chatBoxService: ChatBoxService) {
  }

  ngOnInit() {
    if (this.chatBoxDataItem) {
      this.messageDataItemLength = this.chatBoxDataItem.messageDataItems.length;
    }
    this.scrollToBottom();
  }

  ngAfterViewChecked(): void {
    if (this.chatBoxDataItem) {
      const newMessageDataItemLength = this.chatBoxDataItem.messageDataItems.length;
      if (this.messageDataItemLength !== newMessageDataItemLength) {
        this.messageDataItemLength = newMessageDataItemLength;
        this.scrollToBottom();
      }
    }
  }

  scrollToBottom(): void {
    this.messagesWrapper.nativeElement.scrollTop = this.messagesWrapper.nativeElement.scrollHeight;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chatBoxDataItem && this.chatBoxDataItem.id && !this.chatBoxDataItem.isMessageLoaded) {
      this.chatBoxService.getMessagesByChatBoxId(this.chatBoxDataItem.id).then(messageModels => {
        for (const messageModel of (messageModels as MessageModel[])) {
          const messageDataItem: MessageDataItem = new MessageDataItem();
          BeanUtil.copyProperties(messageDataItem, messageModel);

          if (messageModel.userId === SharedData.loggedInUser.id) {
            messageDataItem.tooltipPlacement = 'left';
            messageDataItem.photoUrl = SharedData.loggedInUser.photoUrl;
            messageDataItem.cssClass = 'sent';
          } else {
            messageDataItem.tooltipPlacement = 'right';
            messageDataItem.photoUrl = this.chatBoxDataItem.photoUrl;
            messageDataItem.cssClass = 'replies';
          }

          this.chatBoxDataItem.messageDataItems.push(messageDataItem);
          this.chatBoxDataItem.isMessageLoaded = true;
        }
      });
    }
  }
}
