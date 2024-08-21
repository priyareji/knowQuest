import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-compose-message',
  templateUrl: './compose-message.component.html',
  styleUrls: ['./compose-message.component.scss']
})
export class ComposeMessageComponent  implements OnInit, OnDestroy {

//   instructorList: any = [];
//   batchList: any = [];
//   studentList: any = [];
//   public batchId: any = null;
//   studentId: any = null;
//   userType: any = null;
//   userId: any = null;
//   user: any = null;
//  // usersToComment: CommentUser[] = [];
//   userSelected: any;
//   message: any = null;
//   instId: any = null;

  private subscriptions = new Subscription();

  constructor(

    private router: Router
  ) {
    // this.userType = this.authService.getUserType();
    // this.userId = this.authService.getUserId();
    // this.userService
    //   .getCurrentUserProfile()
    //   .toPromise()
    //   .then((user) => {
    //     this.user = user;
    //   });
  }

  ngOnInit(): void {

    // if (this.userType == 'instructor') {
    //   this.getBatchesByInstructor(this.userId);
    // }
    // if (this.userType == 'student') {
    //   this.getInstructorsByStudent();
    // }

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  batchListChange(params: any) {
    // this.batchId = params.value;
    // this.getStudentsByBatchId();
  }

  instructorListChange(params: any) {
    // this.instId = params.value;
  }

  studentListChange(params: any) {
    // this.studentId = params.value;
  }

  getInstructorsByStudent() {
    this.subscriptions.add(
      // this.scholerzservice
      //   .getInstructorBystudentId()
      //   .subscribe((res: any) => {
      //     this.instructorList = res;
      //   })
    );
  }

  getBatchesByInstructor(insId: any) {
    this.subscriptions.add(
      // this.scholerzservice
      //   .getBatchesByInstructorId(insId)
      //   .subscribe((res: any) => {
      //     this.batchList = res;
      //   })
    );
  }

  getStudentsByBatchId() {
    this.subscriptions.add(
      // this.scholerzservice
      //   .getStudentsByBatchId(this.batchId)
      //   .subscribe((res: any) => {
      //     this.studentList = res.data;
      //     })
    );
  }

  createComment(userId: any) {
    this.subscriptions.add(
      // this.commentService
      //   .createComment(this.userId)
      //   .subscribe((res: any) => {
      //     this.message = res;
      //   })
    );
  }

  onClickSend() {

  //   if (!this.userSelected || !this.message) return;
  //   let newComment = null;

  //   if (this.userType == 'instructor') {
  //     let createdComment: CreateConversation = {
  //       studentId: this.userSelected.studentId,
  //       studentName: this.userSelected.studentName,
  //       instructorId: this.userId,
  //       instructorName: this.user.name,
  //       comment: {
  //         sender: this.userId,
  //         message: this.message,
  //       },
  //     };
  //     newComment = createdComment;
  //   }

  //   if (this.userType == 'student') {
  //     let createdComment: CreateConversation = {
  //       instructorId: this.userSelected.userId,
  //       instructorName: this.userSelected.name,
  //       studentId: this.userId,
  //       studentName: this.user.first_name + ' ' + this.user.last_name,
  //       comment: {
  //         sender: this.userId,
  //         message: this.message,
  //       },
  //     };
  //     newComment = createdComment;
  //   }

  //   if (!newComment) return;
  //   this.subscriptions.add(
  //     this.commentService
  //       .createComment(newComment)
  //       .subscribe((newComment: Conversation) => {
  //         this.commentService.onUpdateMessage();
  //         this.router.navigate([
  //           `/${this.userType}`,
  //           'messages',
  //           newComment._id,
  //         ]);
  //       })
  //   );

  // }
  }
}
