import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChapterUpdate } from 'src/app/core/models/chapter.model';
import { Unit } from 'src/app/core/models/unit.model';
import { InstructorService } from 'src/app/core/services/instructor.service';

@Component({
  selector: 'app-add-chapter',
  templateUrl: './add-chapter.component.html',
  styleUrls: ['./add-chapter.component.scss']
})
export class AddChapterComponent {
  subjectId:string | null=null;
  chapterFormGroup:FormGroup;
  units: Unit[] = [];
  private subscriptions = new Subscription();
  constructor(
    private _formBuilder: FormBuilder,
    private instructorService: InstructorService,
    private route: ActivatedRoute
  ){
    this.subscriptions.add(
      this.route.parent?.paramMap.subscribe((params) => {

        if (params.get('subjectId')) {
          this.subjectId = params.get('subjectId');
          this.route.parent?.queryParamMap.subscribe((queryParams) => {
            this.getUnitsBySubjectId(this.subjectId);
          });

        }
      })
    );
    this.chapterFormGroup = this._formBuilder.group({
      chapterName: ['', Validators.required],
      chapterDescription: [''],
      unit:[null, Validators.required]
    }); this.subscriptions.add(
      this.route.parent?.paramMap.subscribe((params) => {

        if (params.get('subjectId')) {
          this.subjectId = params.get('subjectId');
          this.route.parent?.queryParamMap.subscribe((queryParams) => {
            this.getUnitsBySubjectId(this.subjectId);
          });

        }
      })
    );
    this.chapterFormGroup = this._formBuilder.group({
      chapterName: ['', Validators.required],
      chapterDescription: [''],
      unit:[null, Validators.required]
    });

  }
  getUnitsBySubjectId(subjectId: any) {
    this.subscriptions.add(
      this.instructorService.getUnitsBySubjectId(subjectId).subscribe((units: Unit[]) => {
        this.units = units;
      }
      )
    );
  }
  get getCurrentChapter() {
    let chapter: ChapterUpdate = {
      chapterName: this.chapterFormGroup.get('chapterName')?.value,
      chapterDescription: this.chapterFormGroup.get('chapterDescription')?.value,
      unitId: this.chapterFormGroup.get('unit')?.value._id,
      subjectId: this.subjectId,
      instructorId: '',

    }
    return chapter
  }
  onClickCreate() {
    let chapter = this.getCurrentChapter;
  console.log(chapter)
    this.subscriptions.add(
      this.instructorService.createChapter(chapter).subscribe(
        () => {
          //this.chapterFormGroup.reset();
         // this.chapterFormGroup.markAsUntouched();
        }
      )
    )
  }
}


