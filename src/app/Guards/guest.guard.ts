import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):any {
    if (AuthService.isLoggedIn()){
      this.router.navigateByUrl("/drawings");
    }
    return true;
  }
  constructor(
    private router: Router
  ) {
  }
}
