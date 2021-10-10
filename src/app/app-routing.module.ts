import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {CanvasComponent} from "./canvas/canvas.component";
import {AuthGuard} from "./Guards/auth.guard";
import { GuestGuard } from './Guards/guest.guard';
import {CanvasListComponent} from "./canvas-list/canvas-list.component";
import {SharedComponent} from "./shared/shared.component";
const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent ,canActivate:[GuestGuard] },
  { path: 'canvas', component: CanvasComponent ,canActivate:[AuthGuard]},
  { path: 'shared', component: SharedComponent ,canActivate:[AuthGuard]},
  { path: 'drawings', component: CanvasListComponent ,canActivate:[AuthGuard]},
  { path: 'canvas/edit/:id', component: CanvasComponent ,canActivate:[AuthGuard]},
  { path: 'canvas/view/:id', component: CanvasComponent ,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
