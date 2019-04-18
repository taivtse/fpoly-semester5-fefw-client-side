import {ChatBoxModel} from './chat-box.model';
import {UserModel} from './user.model';

export class MemberModel {
  id: number = null;
  chatBox: ChatBoxModel = null;
  user: UserModel = null;
}
