import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Chapter } from 'src/app/core/models/chapter.model';
import { SectionUpdate } from 'src/app/core/models/section.model';
import { Unit } from 'src/app/core/models/unit.model';
import { AlertService } from 'src/app/core/services/alert/alert.service';
import { InstructorService } from 'src/app/core/services/instructor.service';

@Component({
  selector: 'app-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.scss']
})
export class AddSectionComponent implements OnInit,OnDestroy {
  sectionFormGroup: FormGroup;
  subjectId:string |null="";
  units: Unit[] = [];
  chapters: Chapter[] = [];
  files: File[] = [];

  private subscriptions = new Subscription();
  constructor(
    private _formBuilder: FormBuilder,
    private instructorService: InstructorService,

    private route: ActivatedRoute
  ) {
    this.subscriptions.add(
      this.route.parent?.paramMap.subscribe((params) => {
        if (params.get('subjectId')) {
          this.subjectId = params.get('subjectId');
           this.getUnitsBySubjectId(this.subjectId);

        }
      })
    );
    this.sectionFormGroup = this._formBuilder.group({
      unit: [null, Validators.required],
      chapter: [null, Validators.required],
      sectionName: [null, Validators.required],
      sectionDescription: [null],
      videoType: [null],
      videoUrl: [null],
    });
  }
  ngOnInit(): void {
    this.onChangeUnit()
  }


  OnFilesUpdate(files: File[]): void {
    this.files = files;
  }

  get getCurrentSection() {
    let sectionUpdate: SectionUpdate = {
      sectionName: this.sectionFormGroup.get('sectionName')?.value,
      chapterId: this.sectionFormGroup.get('chapter')?.value._id,
      unitId: this.sectionFormGroup.get('unit')?.value._id,
      subjectId: this.subjectId,
      //instructorId: '',
    }

    if(this.sectionFormGroup.get('sectionDescription')?.value) {
      sectionUpdate.sectionDescription = this.sectionFormGroup.get('sectionDescription')?.value;
    }

    if(this.files.length>0) {
      sectionUpdate.files = this.files;
    }

    if(this.sectionFormGroup.get('videoType')?.value && this.sectionFormGroup.get('videoUrl')?.value) {
      let videoType = this.sectionFormGroup.get('videoType')?.value;
      let videoUrl = this.sectionFormGroup.get('videoUrl')?.value;

      sectionUpdate.videoType = videoType;
      sectionUpdate.videoUrl = videoUrl;
    }

    return sectionUpdate;
  }

  getUnitsBySubjectId(subjectId:any) {
    this.subscriptions.add(
      this.instructorService.getUnitsBySubjectId(subjectId).subscribe(
        (units: Unit[]) => {
          this.units = units;
        },
        (err) => {
          if (err.error.err.code === 404) {
            err.error.err.message;
          }
        }
      )
    );
  }
  onChangeUnit() {
    this.subscriptions.add(
      this.sectionFormGroup
        .get('unit')
        ?.valueChanges.subscribe((unit: Unit) => {
          if(unit) {
          this.getChaptersByUnitId(unit._id);
          }
        })
    );
  }
  getChaptersByUnitId(unitId: string) {
    console.log("calling")
    this.subscriptions.add(
      this.instructorService
        .getChaptersByUnitId(unitId)
        .subscribe((chapters: Chapter[]) => {
          this.chapters = chapters;
          console.log(this.chapters,"zzzzzz")
        })
    );
  }
  onClickCreate() {
    let section = this.getCurrentSection;
    this.subscriptions.add(
      this.instructorService.createSection(section).subscribe((
        () => {
          this.sectionFormGroup.reset();
        }
      ),
)
    );
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
