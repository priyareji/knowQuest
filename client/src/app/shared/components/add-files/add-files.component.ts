import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { FileService } from 'src/app/core/services/file.service';

@Component({
  selector: 'app-add-files',
  templateUrl: './add-files.component.html',
  styleUrls: ['./add-files.component.scss']
})
export class AddFilesComponent implements OnInit, OnDestroy {
    filesToPreview: File[] = [];

    @Output() onUpdateFile = new EventEmitter<File[]>();

    @Input() label: string = 'file';

    private subscriptions = new Subscription();
    constructor(
      private fileService: FileService
    ) {}

    ngOnInit(): void {
      this.subscriptions.add(
        this.fileService.emptyFileArray$.subscribe(isEmpty => {
          if(isEmpty) {
            this.onEmptyArray();
          }
        })
      );
    }

    ngOnDestroy() {
      this.subscriptions.unsubscribe();
    }

    onEmptyArray() {
      this.filesToPreview = [];
      this.onUpdateFile.emit(this.filesToPreview);
    }

    keepOnlyLastFile() {
      if(this.filesToPreview.length == 0) return;
      // let file = this.filesToPreview[this.filesToPreview.length - 1];
      console.log(this.filesToPreview, this.filesToPreview.length);
      this.filesToPreview.splice(0,this.filesToPreview.length - 2);
      // this.onUpdateFile.emit(this.filesToPreview);
    }

    addFiles(event: any) {
      if (event.target.files.length === 0) {
        return;
      }

      this.filesToPreview.push(<File>event.target.files[0]);
      this.onUpdateFile.emit(this.filesToPreview);
    }

    removeFile(index: number) {
      if (index >= 0) {
        this.filesToPreview.splice(index, 1);
        this.onUpdateFile.emit(this.filesToPreview);
      }
    }
}
