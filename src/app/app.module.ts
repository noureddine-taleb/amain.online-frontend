import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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

import { UserFormComponent } from './dashboard/user-form/user-form.component';
import { UserListComponent } from './dashboard/user-list/user-list.component';
import { UserSingleComponent } from './dashboard/user-single/user-single.component';

import { PaymentFormComponent } from './dashboard/payment-form/payment-form.component';
import { PaymentListComponent } from './dashboard/payment-list/payment-list.component';
import { PaymentSingleComponent } from './dashboard/payment-single/payment-single.component';

import { BillFormComponent } from './dashboard/bill-form/bill-form.component';
import { BillListComponent } from './dashboard/bill-list/bill-list.component';
import { BillSingleComponent } from './dashboard/bill-single/bill-single.component';

import { ProjectFormComponent } from './dashboard/project-form/project-form.component';
import { ProjectListComponent } from './dashboard/project-list/project-list.component';
import { ProjectSingleComponent } from './dashboard/project-single/project-single.component';
import { UserService } from './services/user.service';
import { Interceptor } from './interceptors/interceptor.interceptor';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AlertModule } from 'ngx-alerts';

@NgModule({
  declarations: [
    AppComponent,
    BillFormComponent,
    LoginFormComponent,
    RegisterFormComponent,
    NavBarComponent,
    PaymentFormComponent,
    ProjectFormComponent,
    UserFormComponent,
    UserListComponent,
    PaymentListComponent,
    BillListComponent,
    ProjectListComponent,
    ProjectSingleComponent,
    UserSingleComponent,
    BillSingleComponent,
    PaymentSingleComponent,
    Page404Component,
    Page500Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, position: 'right'})
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
  bootstrap: [AppComponent]
})
export class AppModule { }
