import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { RegisterFormComponent } from './auth/register-form/register-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavBarComponent } from './dashboard/nav-bar/nav-bar.component';
import { CanActivateGuard } from './guards/can-activate.guard';
import { AuthGuard } from './guards/auth.guard';

import { ProjectService } from './services/project.service';
import { BillService } from './services/bill.service';
import { PaymentService } from './services/payment.service';

import { UserListComponent } from './dashboard/user-list/user-list.component';

import { BillListComponent } from './dashboard/bill-list/bill-list.component';

import { ProjectFormComponent } from './dashboard/project-form/project-form.component';
import { ProjectListComponent } from './dashboard/project-list/project-list.component';
import { UserService } from './services/user.service';
import { Interceptor } from './interceptors/interceptor.interceptor';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AlertModule } from 'ngx-alerts';
import { NgxSpinnerModule } from "ngx-spinner";
import { RouterModule } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import { ProfileComponent } from './dashboard/profile/profile.component'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegisterFormComponent,
    NavBarComponent,
    ProjectFormComponent,
    UserListComponent,
    BillListComponent,
    ProjectListComponent,
    Page404Component,
    Page500Component,
    ProfileComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, position: 'right'}),
    NgxSpinnerModule,
    RouterModule,
    NgxPaginationModule,
  ],
  providers: [
    UserService,
    ProjectService,
    BillService,
    PaymentService,
    CanActivateGuard,
    AuthGuard,
    [
      { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    ]
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
