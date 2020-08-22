import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { ProfileComponent } from './profile/profile.component';
import { ReportsComponent } from './reports/reports.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { BillListComponent } from './bill-list/bill-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertModule } from 'ngx-alerts';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProjectService } from '../services/project/project.service';
import { BillService } from '../services/bill/bill.service';
import { PaymentService } from '../services/payment/payment.service';
import { IsAuthGuard } from '../core/guards/is-auth.guard';
import { IsAdminGuard } from '../core/guards/is-admin.guard';
import { TreasuryService } from '../services/treasury/treasury.service';
import { ReportService } from '../services/report/report.service';
import { ValidationService } from '../services/validation/validation.service';
import { SeoService } from '../services/seo/seo.service';
import { AnalyticsService } from '../services/analytics/analytics.service';
import { NavBarComponent } from './layouts/nav-bar/nav-bar.component';
import { BillTableComponent } from './layouts/bill-table/bill-table.component';
import { EmptyCardComponent } from './layouts/empty-card/empty-card.component';
import { DashboardComponent } from './dashboard.component';
import { AppComponent } from '../app.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    ReportsComponent,
    TransactionsComponent,
    ProjectListComponent,
    ProjectFormComponent,
    UserListComponent,
    BillListComponent,
    NavBarComponent,
    BillTableComponent,
    EmptyCardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, position: 'right'}),
    NgxSpinnerModule,
    NgxPaginationModule,
    DashboardRoutingModule,
  ], 
  exports: [
    DashboardComponent,
  ],
  entryComponents: [
    AppComponent
  ]
})
export class DashboardModule { }
