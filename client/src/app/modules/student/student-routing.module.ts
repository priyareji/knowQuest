import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentRootComponent } from './pages/student-root/student-root.component';
import { HomeStudentComponent } from './pages/home-student/home-student.component';


const routes: Routes = [
  {
    path: '',
    component: StudentRootComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeStudentComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
