import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Interceptor } from './core/interceptors/interceptor.interceptor';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { GlobalErrorHandler } from './core/errorHandler/global-error-handler';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthModule } from './auth/auth.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { AnalyticsService } from './services/analytics/analytics.service';
import { SeoService } from './services/seo/seo.service';
import { AlertModule } from 'ngx-alerts';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UserService } from './services/user/user.service';
import { ProjectService } from './services/project/project.service';
import { BillService } from './services/bill/bill.service';
import { PaymentService } from './services/payment/payment.service';
import { IsAuthGuard } from './core/guards/is-auth.guard';
import { IsAdminGuard } from './core/guards/is-admin.guard';
import { TreasuryService } from './services/treasury/treasury.service';
import { ReportService } from './services/report/report.service';
import { ValidationService } from './services/validation/validation.service';
import { IsNotAuthGuard } from './core/guards/is-not-auth.guard';
import { ReactiveFormsModule } from '@angular/forms';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    Page404Component,
    Page500Component,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, position: 'right'}),
    HttpClientModule,
    // ReactiveFormsModule,
    // NgxSpinnerModule,
  ],
  providers: [
    UserService,
    ProjectService,
    BillService,
    PaymentService,
    IsAuthGuard,
    IsAdminGuard,
    TreasuryService,
    ReportService,
    ValidationService,
    AnalyticsService,
    SeoService,
    IsNotAuthGuard,
    [
      { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    ],
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: LOCALE_ID, useValue: 'fr-FR'},
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
