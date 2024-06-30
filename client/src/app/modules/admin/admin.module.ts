import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminRootComponent } from './pages/admin-root/admin-root.component';
import { CreateStudentComponent } from './pages/create-student/create-student.component';
import { CreateInstructorComponent } from './pages/create-instructor/create-instructor.component';
import { CreateSubjectComponent } from './pages/create-subject/create-subject.component';
import { CreateCourseComponent } from './pages/create-course/create-course.component';
import { ManageStudentComponent } from './pages/manage-student/manage-student.component';
import { ManageInstructorComponent } from './pages/manage-instructor/manage-instructor.component';
import { ManageSubjectComponent } from './pages/manage-subject/manage-subject.component';
import { ManageCourseComponent } from './pages/manage-course/manage-course.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdminRootComponent,
    CreateStudentComponent,
    CreateInstructorComponent,
    CreateSubjectComponent,
    CreateCourseComponent,
    ManageStudentComponent,
    ManageInstructorComponent,
    ManageSubjectComponent,
    ManageCourseComponent
  ],
  imports: [
    CommonModule,SharedModule,AdminRoutingModule,FormsModule,ReactiveFormsModule,
  ]
})
export class AdminModule { }
