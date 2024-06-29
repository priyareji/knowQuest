import { Component, inject } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/app.state';
import { loginAction } from '../../state/auth.actions';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  login:FormGroup;
  constructor(){
    this.login=new FormGroup({
      email:new FormControl(null,[Validators.required,Validators.required]),
      password:new FormControl(null,[Validators.required,Validators.minLength(6)])
    })
  }
store=inject(Store<AppState>)
  submit(){
    console.log(this.login.value)
    const payload = this.login.value as Record<string, string>;
  this.store.dispatch(loginAction(payload as any))
    }

}
