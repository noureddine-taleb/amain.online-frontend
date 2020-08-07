import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { RegisterFormComponent } from './auth/register-form/register-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavBarComponent } from './layouts/nav-bar/nav-bar.component';
import { IsAuthGuard } from './guards/is-auth.guard';
import { IsAdminGuard } from './guards/is-admin.guard';
import { IsNotAuthGuard } from './guards/is-not-auth.guard';

import { ProjectService } from './services/project/project.service';
import { BillService } from './services/bill/bill.service';
import { PaymentService } from './services/payment/payment.service';

import { UserListComponent } from './dashboard/user-list/user-list.component';

import { BillListComponent } from './dashboard/bill-list/bill-list.component';

import { ProjectFormComponent } from './dashboard/project-form/project-form.component';
import { ProjectListComponent } from './dashboard/project-list/project-list.component';
import { UserService } from './services/user/user.service';
import { Interceptor } from './interceptors/interceptor.interceptor';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AlertModule } from 'ngx-alerts';
import { NgxSpinnerModule } from "ngx-spinner";
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ReportsComponent } from './dashboard/reports/reports.component';
import { TransactionsComponent } from './dashboard/transactions/transactions.component'; 
import { TreasuryService } from './services/treasury/treasury.service';
import { ReportService } from './services/report/report.service';
import { GlobalErrorHandler } from './errorHandler/global-error-handler';

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
    DashboardComponent,
    ReportsComponent,
    TransactionsComponent,
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
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    UserService,
    ProjectService,
    BillService,
    PaymentService,
    IsAuthGuard,
    IsNotAuthGuard,
    IsAdminGuard,
    TreasuryService,
    ReportService,
    [
      { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    ],
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
