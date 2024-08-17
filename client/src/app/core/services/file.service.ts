import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  emptyFileArray$ = new BehaviorSubject<boolean | null>(null);

  isCurrentFile$ = new BehaviorSubject<any>(null);

  constructor() { }

  emptyFileArray(isEmpty: boolean = true) {
    this.emptyFileArray$.next(isEmpty);
  }


  makeSelectedFileNull() {
    this.isCurrentFile$.next(true);
  }
}
