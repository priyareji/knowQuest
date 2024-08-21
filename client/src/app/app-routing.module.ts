



import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorModule } from './modules/instructor/instructor.module';
import { LoginGuard } from './core/routegurds/login.guard';

const routes: Routes = [
  {path:'',loadChildren:()=>import('./modules/landing/landing.module').then(m=>m.LandingModule), canActivate: [LoginGuard]},
  {path:'admin',
    loadChildren:()=>import('./modules/admin/admin.module').then(m=>m.AdminModule)
  },
  {path:'student',
    loadChildren:()=>import('./modules/student/student.module').then(m=>m.StudentModule)
  },
  {path:'instructor',
    loadChildren:()=>import('./modules/instructor/instructor.module').then(m=>InstructorModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
