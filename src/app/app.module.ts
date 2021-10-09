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
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import { CanvasListComponent } from './canvas-list/canvas-list.component';
import {MatTableModule} from "@angular/material/table";
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    PaintComponent,
    FabricCanvasComponent,
    GraphicalToolbarComponent,
    ColourPaletteComponent,
    ThicknessSliderComponent,
    CanvasComponent,
    CanvasListComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirestore(() => getFirestore()),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    ColorSketchModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
  ],
  providers: [AuthService,EventHandlerService, FabricShapeService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
