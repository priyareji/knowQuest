import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentRoutingModule } from './student-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentRootComponent } from './pages/student-root/student-root.component';
import { HomeStudentComponent } from './pages/home-student/home-student.component';



@NgModule({
  declarations: [
    StudentRootComponent,
    HomeStudentComponent
  ],
  imports: [
    CommonModule,SharedModule,FormsModule,ReactiveFormsModule,StudentRoutingModule
  ]
})
export class StudentModule { }
