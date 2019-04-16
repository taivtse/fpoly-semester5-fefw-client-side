import {MessageDataItem} from './message-data.item';

export class ChatBoxDataItem {
  id: number;
  name: string;
  photoUrl: string;
  currentTypingMessage = '';
  memberId: number;
  messageDataItems: Array<MessageDataItem> = [];
}
