import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ConfirmDialogueComponent } from './components/confirm-dialogue/confirm-dialogue.component';
import { AlertConfirmationDialogComponent } from './components/alert-confirmation-dialog/alert-confirmation-dialog.component';



@NgModule({
  declarations: [
    ConfirmDialogueComponent,
    AlertConfirmationDialogComponent
  ],
  imports: [
    CommonModule,MaterialModule
  ],
  exports:[MaterialModule]
})
export class SharedModule { }
