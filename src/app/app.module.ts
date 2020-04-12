import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { RegisterFormComponent } from './auth/register-form/register-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './dashboard/main/main.component';
import { NavBarComponent } from './dashboard/nav-bar/nav-bar.component';

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

@NgModule({
  declarations: [
    AppComponent,
    BillFormComponent,
    LoginFormComponent,
    RegisterFormComponent,
    MainComponent,
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
    PaymentSingleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    UserService,
    ProjectService,
    BillService,
    PaymentService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
