import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminRootComponent } from './pages/admin-root/admin-root.component';
import { CreateInstructorComponent } from './pages/create-instructor/create-instructor.component';
import { ManageInstructorComponent } from './pages/manage-instructor/manage-instructor.component';
import { CreateCourseComponent } from './pages/create-course/create-course.component';
import { ManageCourseComponent } from './pages/manage-course/manage-course.component';
import { CreateStudentComponent } from './pages/create-student/create-student.component';
import { ManageStudentComponent } from './pages/manage-student/manage-student.component';
import { userOnlyGuard } from 'src/app/core/routegurds/useronly.guard';
import { CreateModeComponent } from './pages/create-mode/create-mode.component';
import { ManageModeComponent } from './pages/manage-mode/manage-mode.component';
import { CreateBranchComponent } from './pages/create-branch/create-branch.component';
import { ManageBranchComponent } from './pages/manage-branch/manage-branch.component';
import { CreateSubjectComponent } from './pages/create-subject/create-subject.component';
import { ManageSubjectComponent } from './pages/manage-subject/manage-subject.component';


const routes: Routes = [
  {
    path: '',
    component: AdminRootComponent,canActivate:[userOnlyGuard],
    children: [
      {
        path: 'create-student',
        component:CreateStudentComponent,
      },
      {
        path: 'manage-student',
        component: ManageStudentComponent,
      },
      {
        path: 'edit-student/:studentId',
        component:CreateStudentComponent,
      },
      {
        path: 'create-instructor',
        component:CreateInstructorComponent,
      },
      {
        path: 'manage-instructors',
        component: ManageInstructorComponent,
      },
      {
        path: 'edit-instructor/:instructorId',
        component: CreateInstructorComponent,
      },
      {
        path: 'create-course',
        component: CreateCourseComponent,
      },
      {
        path: 'edit-course/:courseId',
        component: CreateCourseComponent
      },
      {
        path: 'manage-courses',
        component: ManageCourseComponent,
      },

    {
      path:'create-mode',
      component:CreateModeComponent
    },
    {
      path:'manage-mode',
      component:ManageModeComponent
    },
    {
      path:'create-batches',
      component:CreateBranchComponent
    },
    {
      path:'manage-batches',
      component:ManageBranchComponent
    },
    {
      path: 'edit-batch/:batchId',
      component: CreateBranchComponent,
    },
    {
      path:'create-subject',
      component:CreateSubjectComponent
    },
    {
      path:'manage-subject',
      component:ManageSubjectComponent
    }, {
      path: 'edit-subject/:subjectId',
      component:CreateSubjectComponent,
    },

    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
