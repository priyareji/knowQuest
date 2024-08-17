import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { InstructorRoutingModule } from './instructor-routing.module';
import { InstructorRootComponent } from './pages/instructor-root/instructor-root.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InstructorSubjectListComponent } from './pages/instructor-subject-list/instructor-subject-list.component';
import { InstructorSubjectRootComponent } from './pages/subject/instructor-subject-root/instructor-subject-root.component';
import { AddUnitComponent } from './pages/subject/add-unit/add-unit.component';
import { AddChapterComponent } from './pages/subject/add-chapter/add-chapter.component';
import { AddSectionComponent } from './pages/subject/add-section/add-section.component';
import { AddBooksComponent } from './pages/subject/add-books/add-books.component';
import { InstructorSubjectOverviewComponent } from './pages/subject/instructor-subject-overview/instructor-subject-overview.component';
import { InstructorAssignmentRootComponent } from './pages/instructor-assignment-root/instructor-assignment-root.component';
import { InstructorCreateAssignmentComponent } from './pages/instructor-create-assignment/instructor-create-assignment.component';
import { InstructorViewAssignmentComponent } from './pages/instructor-view-assignment/instructor-view-assignment.component';
import { InstructorViewAllAssignmentComponent } from './pages/instructor-view-all-assignment/instructor-view-all-assignment.component';
import { PrepareQuestionsComponent } from './pages/prepare-questions/prepare-questions.component';
import { SetLiveClassComponent } from './pages/set-live-class/set-live-class.component';



@NgModule({
  declarations: [
    InstructorRootComponent,
    InstructorSubjectListComponent,
    InstructorSubjectRootComponent,
    AddUnitComponent,
    AddChapterComponent,
    AddSectionComponent,
    AddBooksComponent,
    InstructorSubjectOverviewComponent,
    InstructorAssignmentRootComponent,
    InstructorCreateAssignmentComponent,
    InstructorViewAssignmentComponent,
    InstructorViewAllAssignmentComponent,
    PrepareQuestionsComponent,
    SetLiveClassComponent
  ],
  imports: [
    CommonModule,SharedModule,FormsModule,ReactiveFormsModule,InstructorRoutingModule,FlexLayoutModule
  ]
})
export class InstructorModule { }
