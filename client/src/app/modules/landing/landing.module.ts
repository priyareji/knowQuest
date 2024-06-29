import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/auth.effect';
import { authReducer } from './state/auth.reducer';




@NgModule({
  declarations: [

    LandingPageComponent
  ],
  imports: [
    CommonModule,SharedModule,LandingRoutingModule,FormsModule,ReactiveFormsModule,
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature('auth',authReducer)
  ]
})
export class LandingModule { }
