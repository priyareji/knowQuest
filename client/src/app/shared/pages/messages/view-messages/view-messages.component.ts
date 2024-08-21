import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Subscription, take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.services';
import { Conversation, ConversationUpdate } from 'src/app/core/models/comment.model';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-view-messages',
  templateUrl: './view-messages.component.html',
  styleUrls: ['./view-messages.component.scss']
})
export class ViewMessagesComponent  implements OnInit, OnDestroy {

  role:string="";
  userId:string="123";
  commentMessage:string="";

  senderName:string="";
  conversations: { senderId: string, from: string; content: string, time: Date }[] = [];

  commentId:string="";

  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize | any;

  private subscriptions = new Subscription();
  constructor(
    private _ngZone: NgZone,
    //private commentService: CommentService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    // this.userType = this.authService.getUserType();
    // this.userId = this.authService.getUserId();
    this.subscriptions.add(
      this.route.params.subscribe((params) => {
        console.log(params)
       // this.commentId = params.commentId;
        this.getComment(this.commentId);
      })
    );
  }

  ngOnInit(): void { }

  getComment(commentId: string) {
    this.subscriptions.add(
      // this.commentService.getCommentByCommentId(commentId).subscribe(
      //   (comment: Conversation) => {
      //     console.log(comment, "comment recieved")
      //     this.senderName = this.userType == 'instructor' ? comment.studentName : comment.instructorName;
      //     this.conversations = comment.conversation.map(m => {
      //       return {
      //         senderId: m.sender,
      //         from: m.sender == this.userId ? 'You' : this.userType == 'instructor' ? comment.studentName : comment.instructorName,
      //         content: m.message,
      //         time: m.time,
      //       }
      //     })
      //   }
      // )
    );
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onClickComment() {
    if (!this.commentMessage) return;
    // let commentUpdate: ConversationUpdate = {
    //   //sender: this.userId,
    //   message: this.commentMessage
    // }
    // this.subscriptions.add(this.commentService.addComment(this.commentId, commentUpdate).subscribe(data => {
    //   this.commentMessage = '';
    //   this.getComment(this.commentId);
    //   this.commentService.onUpdateMessage();
    // }, err => { }))

  }
}

