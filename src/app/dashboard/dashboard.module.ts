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
import { NavBarComponent } from './layouts/nav-bar/nav-bar.component';
import { BillTableComponent } from './layouts/bill-table/bill-table.component';
import { EmptyCardComponent } from './layouts/empty-card/empty-card.component';
import { DashboardComponent } from './dashboard.component';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { environment } from '../../environments/environment';

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
    HttpClientModule, 
    CommonModule,
    NgxPaginationModule,
    DashboardRoutingModule,

    ReactiveFormsModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, position: 'right'}),
    NgxSpinnerModule,
  ], 
  exports: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
