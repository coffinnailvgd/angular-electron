import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import {AuthService} from './providers/auth.service';
import {AuthGuard} from './providers/auth-guard.service';
import { TeamSelectComponent } from './components/team-select/team-select.component';
import { RoomDetailsComponent } from './components/room-details/room-details.component';
import { RoomComponent } from './components/room/room.component';
import { ChatComponent } from './components/chat/chat.component';
import { UserProfileDropdownComponent } from './components/user-profile-dropdown/user-profile-dropdown.component';
import { ScreenShareComponent } from './components/screen-share/screen-share.component';
import { VideoConferenceComponent } from './components/video-conference/video-conference.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    LoginComponent,
    SignupComponent,
    TeamSelectComponent,
    RoomDetailsComponent,
    RoomComponent,
    ChatComponent,
    UserProfileDropdownComponent,
    ScreenShareComponent,
    VideoConferenceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    ElectronService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
