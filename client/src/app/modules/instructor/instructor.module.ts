import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { InstructorRoutingModule } from './instructor-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,SharedModule, InstructorRoutingModule
  ]
})
export class InstructorModule { }
