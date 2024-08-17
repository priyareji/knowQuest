import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { userOnlyGuard } from 'src/app/core/routegurds/useronly.guard';
import { InstructorRootComponent } from './pages/instructor-root/instructor-root.component';
import { InstructorSubjectListComponent } from './pages/instructor-subject-list/instructor-subject-list.component';
import { InstructorSubjectRootComponent } from './pages/subject/instructor-subject-root/instructor-subject-root.component';
import { AddBooksComponent } from './pages/subject/add-books/add-books.component';
import { AddSectionComponent } from './pages/subject/add-section/add-section.component';
import { AddChapterComponent } from './pages/subject/add-chapter/add-chapter.component';
import { AddUnitComponent } from './pages/subject/add-unit/add-unit.component';
import { InstructorSubjectOverviewComponent } from './pages/subject/instructor-subject-overview/instructor-subject-overview.component';
import { InstructorAssignmentRootComponent } from './pages/instructor-assignment-root/instructor-assignment-root.component';
import { InstructorCreateAssignmentComponent } from './pages/instructor-create-assignment/instructor-create-assignment.component';
import { InstructorViewAllAssignmentComponent } from './pages/instructor-view-all-assignment/instructor-view-all-assignment.component';
import { InstructorViewAssignmentComponent } from './pages/instructor-view-assignment/instructor-view-assignment.component';
import { PrepareQuestionsComponent } from './pages/prepare-questions/prepare-questions.component';
import { SetLiveClassComponent } from './pages/set-live-class/set-live-class.component';


const routes: Routes = [
  {path: '',
  component: InstructorRootComponent,
children:[ {
  path: '',
  redirectTo: 'subjects',
  pathMatch: 'full'
},
  {
  path: 'subjects',
  component: InstructorSubjectListComponent
},
{
  path: 'subject/:subjectId',
  component: InstructorSubjectRootComponent,
  children: [
    {
      path: '',
      redirectTo: 'overview',
      pathMatch: 'full'
    },
    {
      path: 'overview',
      component: InstructorSubjectOverviewComponent
    },
    {
      path: 'unit',
      component: AddUnitComponent
    },
    {
      path: 'chapter',
      component: AddChapterComponent
    },
    {
      path: 'section',
      component: AddSectionComponent
    },
    {
      path: 'library',
      component: AddBooksComponent
    }
  ]
},
{
  path: 'prepare-questions/:subjectId',
  component: PrepareQuestionsComponent
},
{
  path: 'live-class',
  component: SetLiveClassComponent
},
{
  path:'assignment',
  component:InstructorAssignmentRootComponent,
  children: [
    {
      path: '',
      redirectTo: 'create',
      pathMatch: 'full'
    },
    {
      path: 'create',
      component: InstructorCreateAssignmentComponent
    },
    {
      path: 'view',
      component: InstructorViewAllAssignmentComponent
    },
    {
      path: 'view/:assignmentId',
      component: InstructorViewAssignmentComponent
    }
  ]
}
]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorRoutingModule { }
