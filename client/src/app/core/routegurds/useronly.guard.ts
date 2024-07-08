import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../services/auth.services";

export const userOnlyGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const toaster = inject(ToastrService)
  const authService = inject(AuthService);
  const accessToken = authService.getAccessToken();
  const refreshToken = authService.getRefreshToken()
  if (accessToken && refreshToken) {
  return true
  }
else{
  toaster.warning("please login to access this page")
  router.navigate([''])
  return false;
}

};
