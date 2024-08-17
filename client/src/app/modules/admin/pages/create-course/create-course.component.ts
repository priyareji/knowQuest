import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ROUTES } from 'src/app/app-routes';
import { Subject } from 'src/app/core/models/subject';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit, OnDestroy {
  createCourseFormGroup:FormGroup;
  isEditMode = false;
  courseId: string | null = null;
  
  subjectList:Subject[] = []
  private subscriptions = new Subscription();
  constructor( private _formBuilder: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router){
      this.createCourseFormGroup = this._formBuilder.group({
      courseName: ['', Validators.required],
      description: ['', Validators.required],
      subject:['',Validators.required]
      })
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log(params.get('courseId'));
      this.courseId = params.get('courseId');
      console.log(this.courseId,"courseid")
      this.isEditMode = !!this.courseId;

      if(this.isEditMode && this.courseId){
        this.dataService.getCourseById(this.courseId).subscribe(coursedata => {
          const course =coursedata.data
          this.createCourseFormGroup.patchValue(course)

        });
  }

})
this.getCourses()
}
getCourses() {
    this.subscriptions.add(
     this.dataService.getSubjects().subscribe((subject:Subject[]) => {
     this.subjectList = subject;
     console.log(this.subjectList,"subjectt")
      })
   );
   }
// getCourses() {
  //   this.subscriptions.add(
  //     this.dataService.getCourse().subscribe((courses: Course[]) => {
  //       this.courses = courses;
  //     })
  //   );
  // }

  createCourse(){
    const formValue = this.createCourseFormGroup.value;
    const payload = {
      courseName: formValue.courseName,
      description: formValue.description,
      subject:formValue.subject
    };
    console.log(payload)
    if (this.isEditMode && this.courseId) {
      this.dataService.updateCourse(this.courseId, payload).subscribe(() => {
        this.router.navigate(ROUTES.ADMIN.MANAGE_COURSES);
      });
    } else {
    this.subscriptions.add(
      this.dataService.createCourse(payload).subscribe(() => this.router.navigate(ROUTES.ADMIN.MANAGE_COURSES))
    );
  }
  }
ngOnDestroy(): void {
  this.subscriptions.unsubscribe();
}
}
