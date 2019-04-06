import {MessageDataItem} from './message-data.item';

export class ChatBoxDataItem {
  id: number;
  page: number;
  messageItemData: Array<MessageDataItem>;
}
