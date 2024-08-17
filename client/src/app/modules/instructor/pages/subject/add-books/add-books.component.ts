import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookUpdate } from 'src/app/core/models/book.model';
import { UnitUpdate } from 'src/app/core/models/unit.model';
import { VideoUpdate } from 'src/app/core/models/video.model';
import { DataService } from 'src/app/core/services/data.service';
import { InstructorService } from 'src/app/core/services/instructor.service';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.scss']
})
export class AddBooksComponent implements OnInit,OnDestroy {
  addBookFormGroup: FormGroup;
  addVideoFormGroup: FormGroup;
  files: File[] = [];
   subjectId: string | null = "";
   private subscriptions = new Subscription();
   constructor(
    private _formBuilder: FormBuilder,
    private instructorService:InstructorService,
    private route: ActivatedRoute
  ) {
    this.subscriptions.add(
      this.route.parent?.paramMap.subscribe((params) => {
        if (params.get('subjectId')) {
          this.subjectId = params.get('subjectId');

        }
      })
    );

     this.addBookFormGroup = this._formBuilder.group({
      bookName:[null, Validators.required],
     })
     this.addVideoFormGroup= this._formBuilder.group({
     videoName:[null, Validators.required],
     videoSummary:[null, Validators.required],
     videoType: [null, Validators.required],
     videoUrl: [null, Validators.required]
    })
  }
  OnFilesUpdate(files: File[]): void {
    this.files = files;
  }
  get getCurrentBook() {
    let bookUpdate: BookUpdate = {
      bookName: this.addBookFormGroup.get('bookName')?.value,
      subjectId: this.subjectId,
    }
     if(this.files.length>0) {
      bookUpdate.files = this.files;
    }

     return bookUpdate;
  }
  print(){
    console.log('files',this.files);
  }
  get getCurrentLibraryvideo() {
    let videoUpdate: VideoUpdate = {

      subjectId: this.subjectId,
    }

    if(this.addVideoFormGroup.get('videoType')?.value && this.addVideoFormGroup.get('videoUrl')?.value) {
      let videoType = this.addVideoFormGroup.get('videoType')?.value;
      let videoUrl = this.addVideoFormGroup.get('videoUrl')?.value;
      let videoName = this.addVideoFormGroup.get('videoName')?.value;
      let videoSummary = this.addVideoFormGroup.get('videoSummary')?.value;

      videoUpdate.videoType = videoType;
      videoUpdate.videoUrl = videoUrl;
      videoUpdate.videoName = videoName;
      videoUpdate.videoSummary = videoSummary
    }
     return videoUpdate;
  }

  onClickaddVideo(){
    let video = this.getCurrentLibraryvideo;
    this.subscriptions.add(
      this. instructorService.createLibraryVideo(video).subscribe(() => {
        this.addVideoFormGroup.reset();
      },
      )
    );
  }
  onClickaddBook(){
       let book = this.getCurrentBook;
        debugger;
        this.subscriptions.add(
        this.instructorService.createBook(book).subscribe(()=> {
        this.addBookFormGroup.reset();
      },)
    );


  }
  ngOnInit(): void {

  }
  ngOnDestroy(): void {

  }
}
