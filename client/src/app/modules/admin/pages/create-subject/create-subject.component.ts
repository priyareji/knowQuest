import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ROUTES } from 'src/app/app-routes';
import { Course } from 'src/app/core/models/course';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.scss']
})
export class CreateSubjectComponent implements OnInit, OnDestroy {

   createSubjectFormGroup: FormGroup;
  courses: Course[] = [];
  private subscriptions = new Subscription();

  constructor(
    private _formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this. createSubjectFormGroup = this._formBuilder.group({
      subjectName: ['', Validators.required],
      course: [null, Validators.required],

    });
  }
  ngOnInit(): void {
    this.getCourses();
  }


  getCourses() {
    this.subscriptions.add(
      this.dataService.getCourse().subscribe((courses: Course[]) => {
        this.courses = courses;
      })
    );
  }

  createSubject(){
    const formValue = this.createSubjectFormGroup.value;
    const payload = {
      subjectName: formValue.subjectName,
      course: formValue.course,
    };
    console.log(payload)
    this.subscriptions.add(
      this.dataService.createSubject(payload).subscribe(() => this.router.navigate(ROUTES.ADMIN.MANAGE_SUBJECT))
    );
  }




  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

