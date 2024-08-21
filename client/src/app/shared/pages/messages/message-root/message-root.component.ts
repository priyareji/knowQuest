import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.services';

@Component({
  selector: 'app-message-root',
  templateUrl: './message-root.component.html',
  styleUrls: ['./message-root.component.scss']
})
export class MessageRootComponent implements OnInit, OnDestroy {
  role: string="";
  userId: any;
  conversations: {
    _id: string;
    from: string;
    content: string;
    time: Date;
    messageFrom: string;
  }[] = [];

  private subscriptions = new Subscription();
  constructor(
    //private commentService: CommentService,
    private authService: AuthService
  ) {
    //this.role = this.authService.getUserType();
   // this.userId = this.authService.getUserId();
  }

  ngOnInit(): void {
    this.getConversations();
    this.subscriptions.add(
      // this.commentService.updateComment$.subscribe(res => {
      //   if(res){
      //     this.getConversations();
      //   }})
    )
  }

  getConversations() {
    this.subscriptions.add(
      // this.commentService
      //   .getCommentsByUserId()
      //   .subscribe((comments: Conversation[]) => {
      //     this.conversations = comments.map((conversation) => {
      //       let lastMessage =
      //         conversation.conversation[conversation.conversation.length - 1];

      //       return {
      //         _id: conversation._id,
      //         content: lastMessage.message,
      //         from:
      //           lastMessage.sender == this.userId
      //             ? 'You'
      //             : this.userType == 'instructor'
      //             ? conversation.studentName
      //             : conversation.instructorName,
      //         time: lastMessage.time,
      //         messageFrom: this.userType == 'instructor'? conversation.studentName: conversation.instructorName
      //       };
      //     });
      //   })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
