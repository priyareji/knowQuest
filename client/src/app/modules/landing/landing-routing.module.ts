import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


const routes: Routes = [
{path:'',component:LandingPageComponent},
{path:'landingpage',component:LandingPageComponent},
{path:'reset-password',component:ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
