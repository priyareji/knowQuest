import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { FileService } from 'src/app/core/services/file.service';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.scss']
})
export class AddFileComponent implements OnInit {
  fileToPreview: File | null = null;

  @Output() onUpdateFile = new EventEmitter<File | null>();
  @Input() label: string = 'file';

  private subscriptions = new Subscription();
  constructor(private fileService: FileService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.fileService.isCurrentFile$.subscribe((isEmpty) => {
        if (isEmpty) {
          this.onEmptyFile();
        }
      })
    );
  }

  onEmptyFile() {
    this.fileToPreview = null;
    this.onUpdateFile.emit(this.fileToPreview);
  }

  addFile(event: any) {
    if (event.target.files.length === 0) {
      return;
    }

    this.fileToPreview = <File>event.target.files[0];
    this.onUpdateFile.emit(this.fileToPreview);
  }
}



