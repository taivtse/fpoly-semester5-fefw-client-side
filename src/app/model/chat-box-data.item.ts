import {MessageDataItem} from './message-data.item';

export class ChatBoxDataItem {
  id: number;
  page = 1;
  messageDataItems: Array<MessageDataItem> = [];
}
