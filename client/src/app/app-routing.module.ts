import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorModule } from './modules/instructor/instructor.module';

const routes: Routes = [
  {path:'admin',
    loadChildren:()=>import('./modules/admin/admin.module').then(m=>m.AdminModule)
  },
  {path:'student',
    loadChildren:()=>import('./modules/student/student.module').then(m=>m.StudentModule)
  },
  {path:'Instructor',
    loadChildren:()=>import('./modules/instructor/instructor.module').then(m=>InstructorModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
