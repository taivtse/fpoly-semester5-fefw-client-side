import {MessageDataItem} from './message-data.item';

export class ChatBoxDataItem {
  id: number = null;
  name: string = null;
  photoUrl: string = null;
  currentTypingMessage: string = null;
  memberId: number = null;
  isMessageLoaded = false;
  messageDataItems: Array<MessageDataItem> = [];
}
