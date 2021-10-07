import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';


import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAnalyticsModule} from '@angular/fire/compat/analytics';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {environment} from '../environments/environment';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {VerifyEmailComponent} from './components/verify-email/verify-email.component';
import {AuthService} from "./services/auth.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {PaintComponent} from "./paint/paint.component";
import {FabricCanvasComponent} from "./paint/fabric-canvas/fabric-canvas.component";
import {GraphicalToolbarComponent} from "./paint/toolbar/toolbar.component";
import {ThicknessSliderComponent} from "./paint/toolbar/thickness-slider/thickness-slider.component";
import { ColourPaletteComponent } from './paint/toolbar/colour-palette/colour-palette.component';
import { CanvasComponent } from './canvas/canvas.component';
import {EventHandlerService} from "./paint/event-handler.service";
import {FabricShapeService} from "./paint/shape.service";
import {ColorSketchModule} from "ngx-color/sketch";
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    PaintComponent,
    FabricCanvasComponent,
    GraphicalToolbarComponent,
    ColourPaletteComponent,
    ThicknessSliderComponent,
    CanvasComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    ColorSketchModule,
  ],
  providers: [AuthService,EventHandlerService, FabricShapeService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
