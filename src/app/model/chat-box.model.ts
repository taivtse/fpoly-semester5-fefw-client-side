import {MessageModel} from './message.model';

export class ChatBoxModel {
  id: number;
  page: number;
  messageModels: MessageModel[];
}
