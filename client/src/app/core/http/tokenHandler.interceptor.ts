import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, catchError, switchMap, tap, throwError, of } from "rxjs";
import { AuthService } from "../services/auth.services";
import { ApiResponse } from "../models/apiResponse";
import { AppState } from 'src/app/shared/store/app.state';
import { Store } from "@ngrx/store";
import { logout } from 'src/app/modules/landing/state/auth.actions';
@Injectable()
export class TokenHandlerInterceptor implements HttpInterceptor{
  authService:AuthService = inject(AuthService);
  store:Store<AppState> = inject(Store<AppState>)
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.authService.getAccessToken();

    const authRequest = request.clone({
      headers: request.headers.set('authorization', `Bearer ${accessToken}`)
    });

    if (accessToken) {
      return next.handle(authRequest).pipe(
        tap((event) => {
          if (event.type === HttpEventType.Response) {
            console.log(event.body, "event");
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.log('error occurred', error);

          // Check if the error is due to the student being blocked
          if (error.status === 403 && error.error.message === "Account is Blocked") {
            // Handle the blocked student case
            this.store.dispatch(logout())
            this.authService.userLogout();  // Log out the student
            return throwError(() => new Error("Student is blocked. Logging out."));
          }

          // Refresh token logic in case of 401 Unauthorized error
          if (error.status === 401) {
            return this.authService.refreshAccessToken().pipe(
              switchMap((response: ApiResponse) => {
                this.authService.setAccessToken(response.data.accessToken);
                this.authService.setRefreshToken(response.data.refreshToken);
                const newAuthRequest = request.clone({
                  headers: request.headers.set('authorization', `Bearer ${response.data.accessToken}`)
                });
                return next.handle(newAuthRequest);
              }),
              catchError((refreshError) => {
                this.authService.userLogout();
                return throwError(() => refreshError);
              })
            );
          }

          // Return the original error if it's not handled above
          return throwError(() => error);
        })
      );
    }

    return next.handle(request);
  }
}
