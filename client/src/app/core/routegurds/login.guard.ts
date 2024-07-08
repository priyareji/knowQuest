import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.services";




@Injectable({
  providedIn:'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const accessToken = this.authService.getAccessToken();
    const refreshToken = this.authService.getRefreshToken()
    if (accessToken && refreshToken) {
      this.router.navigate(['/admin'])
    return false;
    }
    return true;
  }

}
