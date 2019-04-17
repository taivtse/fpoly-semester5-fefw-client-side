import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {MessageDataItem} from '../../model/message-data.item';
import {ChatBoxDataItem} from '../../model/chat-box-data.item';
import {SharedData} from '../../shared/shared.data';
import {ChatDataItemService} from '../../shared/chat-data-item.service';
import {ChatService} from '../../shared/chat.service';
import {SocketMessageModel} from '../../model/socket-message.model';
import {MessageType} from '../../model/MessageType';

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
              private chatDataItemService: ChatDataItemService,
              private chatService: ChatService) {
  }

  ngOnInit() {
    this.chatService.connect(this.onMessageReceived);
    this.chatDataItemService.chatDataItemsNotify.subscribe(() => {
      this.chatDataItemService.chatBoxModels.forEach(chatBoxModel => {
        if (!this.chatBoxDataItemMap.has(chatBoxModel.chatBoxParam)) {
          const chatBoxDataItem = new ChatBoxDataItem();
          chatBoxDataItem.id = chatBoxModel.id;
          chatBoxDataItem.name = chatBoxModel.name;
          chatBoxDataItem.photoUrl = chatBoxModel.photoUrl;
          this.chatBoxDataItemMap.set(chatBoxModel.chatBoxParam, chatBoxDataItem);
          console.log(this.chatBoxDataItemMap.get(this.chatBoxParam));
        }
      });

      if (this.chatDataItemService.isChatDataItemsLoaded) {
        // subscribe param once
        this.chatDataItemService.isChatDataItemsLoaded = false;

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

  onSendMessage(): void {
    if (this.chattingInput.nativeElement.value === '') {
      return;
    }

    const socketMessageModel = new SocketMessageModel();
    socketMessageModel.content = this.chattingInput.nativeElement.value.trim();
    socketMessageModel.date = new Date();
    socketMessageModel.type = MessageType.TEXT;
    socketMessageModel.sentMemberId = this.currentChatBoxDataItem.memberId;
    socketMessageModel.sentUserProviderId = SharedData.loggedInUser.providerId;
    socketMessageModel.receivedUserProviderId = this.chatBoxParam;

    this.chatService.sendMessage(socketMessageModel)
      .then(() => {
        const messageDataItem = new MessageDataItem();
        Object.assign(messageDataItem, socketMessageModel);
        messageDataItem.tooltipPlacement = 'left';
        messageDataItem.photoUrl = SharedData.loggedInUser.photoUrl;
        messageDataItem.cssClass = 'sent';
        this.chatBoxDataItemMap.get(this.chatBoxParam).messageDataItems.push(messageDataItem);
        this.progressAfterSendMessage(messageDataItem);
      }).catch(err => console.log(err));
  }

  onMessageReceived(socketMessageModel: SocketMessageModel): void {
    // const messageDataItem = new MessageDataItem();
    // Object.assign(messageDataItem, socketMessageModel);
    // messageDataItem.tooltipPlacement = 'left';
    // messageDataItem.photoUrl = SharedData.loggedInUser.photoUrl;
    // messageDataItem.cssClass = 'sent';
    // this.chatBoxDataItemMap.get(this.chatBoxParam).messageDataItems.push(messageDataItem);
    console.log(socketMessageModel);
  }

  progressAfterSendMessage(messageDataItem: MessageDataItem) {
    this.chattingInput.nativeElement.focus();
    this.chattingInput.nativeElement.value = '';
    this.currentChatBoxDataItem.currentTypingMessage = '';

    //  set current chat item to top
    this.chatDataItemService.moveActiveChatItemToTop();

    //  set last message content and last message date in chat item
    this.chatDataItemService.chatBoxModels[0].lastMessageContent = 'You: ' + messageDataItem.content;
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
      this.onSendMessage();
    }
  }
}
