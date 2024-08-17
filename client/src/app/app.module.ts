import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TokenHandlerInterceptor } from './core/http/tokenHandler.interceptor';
import { ToastrModule } from 'ngx-toastr';

//import { AlertConfirmationDialogComponent } from './shared/components/alert-confirmation-dialog/alert-confirmation-dialog.component';
//import { AlertConfirmationDialogComponent } from './modules/shared/components/alert-confirmation-dialog/alert-confirmation-dialog.component';



@NgModule({
  declarations: [
    AppComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,EffectsModule.forRoot([]),
    StoreModule.forRoot({}),
    ToastrModule.forRoot( {timeOut:5000, positionClass:'toast-top-right',
       preventDuplicates:true,progressAnimation:'increasing'}),
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenHandlerInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
