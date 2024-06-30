import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminRootComponent } from './pages/admin-root/admin-root.component';
import { CreateInstructorComponent } from './pages/create-instructor/create-instructor.component';
import { ManageInstructorComponent } from './pages/manage-instructor/manage-instructor.component';
import { CreateCourseComponent } from './pages/create-course/create-course.component';
import { ManageCourseComponent } from './pages/manage-course/manage-course.component';
import { CreateStudentComponent } from './pages/create-student/create-student.component';
import { ManageStudentComponent } from './pages/manage-student/manage-student.component';


const routes: Routes = [
  {
    path: '',
    component: AdminRootComponent,
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

    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
