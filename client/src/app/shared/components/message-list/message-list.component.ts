import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent {
  @Input() messageSender: string = '';
  @Input() messageContent: string = '';
  @Input() messageTime: any = null;
  @Input() messageFrom: string = '';


  /**To indicate if the message is recieved or send from the user */
  @Input() isMessageFrom: boolean = true;

  /**If conversation mode, user will be able to see the full message,
   * else the messages are trimmed and made as links
   */
  @Input() conversationMode: boolean = false;
  @Input() conversationId: string = '';
}
