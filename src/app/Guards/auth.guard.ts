import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,Router, RouterStateSnapshot } from '@angular/router';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):any {
    if (!AuthService.isLoggedIn()){
      this.router.navigateByUrl("/sign-in");
    }
    return true;
  }
  constructor(
    private router: Router
  ) {
  }
}
