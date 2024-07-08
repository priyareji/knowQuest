import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from 'rxjs';
import { AlertConfirmationDialogComponent } from 'src/app/shared/components/alert-confirmation-dialog/alert-confirmation-dialog.component';

interface AlertConfig {
  duration?: number;
  action?: string;
  horizontalPosition?: 'center' | 'start' | 'end' | 'left' | 'right';
  verticalPosition?: 'top' | 'bottom';
}

interface SnackBarConfig {
  duration?: number;
  panelClass?: string;
  horizontalPosition?: 'center' | 'start' | 'end' | 'left' | 'right';
  verticalPosition?: 'top' | 'bottom';
}



@Injectable ({
  providedIn:'root'
})
export class AlertService{
  constructor(
    private snackBar:MatSnackBar,
    private dialog:MatDialog
  ){}

  info(message:string,action :string = '',alertConfig?:AlertConfig){
    return this.openAlertNotification(message,action,{panelClass:'alert-primary',...alertConfig});
  }
  success(message:string,action:string = '',alertConfig?:AlertConfig){
    return this.openAlertNotification(message,action,{panelClass:'alert-accent',...alertConfig});
  }
  error(message:string,action:string = '',alertConfig?:AlertConfig){
    return this.openAlertNotification(message,action,{panelClass:'alert-red',...alertConfig});
  }
  warn(message:string,action:string = '',alertConfig?:AlertConfig){
    return this.openAlertNotification(message,action,{panelClass:'alert-orange',...alertConfig});
  }
  confirm(message?: string, confirmButtonText?: string, cancelButtonText?: string, details?: {}): Observable<boolean> {
    const confirmDialog = this.dialog.open(AlertConfirmationDialogComponent, {
      data: {
        message: message,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
      }
    });
    return confirmDialog.afterClosed();
  }
  private openAlertNotification(message: string, action: string, snackBarConfig?: SnackBarConfig) {
    if (!snackBarConfig) snackBarConfig = {};
    if (!snackBarConfig.duration) snackBarConfig.duration = 3000;
    if (!snackBarConfig.panelClass) snackBarConfig.panelClass = '';
    if (!snackBarConfig.horizontalPosition) snackBarConfig.horizontalPosition = 'center';
    if (!snackBarConfig.verticalPosition) snackBarConfig.verticalPosition = 'top';
    return this.snackBar.open(message, action, {
      data: message,
      duration: snackBarConfig.duration,
      panelClass: snackBarConfig.panelClass,
      verticalPosition: snackBarConfig.verticalPosition,
      horizontalPosition: snackBarConfig.horizontalPosition
    });
  }


}
