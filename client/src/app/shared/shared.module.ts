import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ConfirmDialogueComponent } from './components/confirm-dialogue/confirm-dialogue.component';
import { AlertConfirmationDialogComponent } from './components/alert-confirmation-dialog/alert-confirmation-dialog.component';

import { AddFilesComponent } from './components/add-files/add-files.component';
import { TrimStringPipe } from './pipes/trim-string.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { AddFileComponent } from './components/add-file/add-file.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import { MessageRootComponent } from './pages/messages/message-root/message-root.component';
import { ComposeMessageComponent } from './pages/messages/compose-message/compose-message.component';
import { ViewMessagesComponent } from './pages/messages/view-messages/view-messages.component';


@NgModule({
  declarations: [
    ConfirmDialogueComponent,
    AlertConfirmationDialogComponent,
    AddFilesComponent,
    TrimStringPipe,
    AddFileComponent,
    MessageListComponent,
    MessageRootComponent,
    ComposeMessageComponent,
    ViewMessagesComponent
  ],
  imports:  [MaterialModule, FormsModule, ReactiveFormsModule, CommonModule, FlexLayoutModule, RouterModule],
  exports:[MaterialModule, FlexLayoutModule,TrimStringPipe,AddFilesComponent,AddFileComponent,MessageListComponent,
    AlertConfirmationDialogComponent,]
})
export class SharedModule { }
