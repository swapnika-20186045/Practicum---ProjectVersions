import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { FlashMessagesModule} from 'angular2-flash-messages';
import { ServiceService } from './service.service';
import { PopupComponent } from './popup/popup.component';
import { ProfileComponent } from './profile/profile.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { ForgotpwdComponent } from './forgotpwd/forgotpwd.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent },
  { path: 'popup', component: PopupComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: '', component: MainpageComponent},
  { path:'forgot', component:ForgotpwdComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    PopupComponent,
    ProfileComponent,
    MainpageComponent,
    ForgotpwdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FlashMessagesModule.forRoot()
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
