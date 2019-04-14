import {MessageDataItem} from './message-data.item';

export class ChatBoxDataItem {
  id: number;
  page = 1;
  name: string;
  photoUrl: string;
  currentTypingMessage = '';
  messageDataItems: Array<MessageDataItem> = [];
}
