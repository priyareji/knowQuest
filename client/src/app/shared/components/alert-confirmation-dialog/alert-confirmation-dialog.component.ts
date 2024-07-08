import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-confirmation-dialog',
  templateUrl: './alert-confirmation-dialog.component.html',
  styleUrls: ['./alert-confirmation-dialog.component.scss']
})
export class AlertConfirmationDialogComponent  implements OnInit {

  message: string = "Are you sure?"

  confirmButtonText = "Yes"
  cancelButtonText = "No"

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AlertConfirmationDialogComponent>) {

    if (data) {
      this.message = data.message || this.message;
      this.confirmButtonText = data.confirmButtonText || this.confirmButtonText;
      this.cancelButtonText = data.cancelButtonText || this.cancelButtonText;
    }
  }

  ngOnInit(): void {

  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

  onCancelClick() {
    this.dialogRef.close(false);
  }
}
