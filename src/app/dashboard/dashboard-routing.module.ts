import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ReportsComponent } from './reports/reports.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { BillListComponent } from './bill-list/bill-list.component';
import { IsAdminGuard } from '../core/guards/is-admin.guard';
import { IsAuthGuard } from '../core/guards/is-auth.guard';

const routes: Routes = [
  {
    path: '',
    component : ProfileComponent ,
    canActivate : [IsAuthGuard],
    pathMatch : 'full',
    data: { animation: 'profilePage' }
  },
  {
    path: 'reports',
    component : ReportsComponent,
    canActivate : [IsAuthGuard],
    pathMatch : 'full'  ,
    data: { animation: 'reportsPage' }
  },
  {
    path: 'transactions',
    component : TransactionsComponent,
    canActivate : [IsAdminGuard],
    pathMatch : 'full'  ,
    data: { animation: 'transactionsPage' }
  },
  {
    path: 'projects',
    component : ProjectListComponent,
    canActivate : [IsAuthGuard],
    pathMatch : 'full'  ,
    data: { animation: 'projectsPage' }
  },
  {
    path: 'projects/create',
    component : ProjectFormComponent,
    canActivate : [IsAdminGuard],
    pathMatch : 'full'  ,
    data: { animation: 'projectFormPage' }
  },
  {
    path: 'users',
    component : UserListComponent ,
    canActivate : [IsAdminGuard],
    pathMatch : 'full'  ,
    data: { animation: 'userListPage' }
  },
  {
    path: 'users/:userID/bills',
    component : BillListComponent ,
    canActivate : [IsAdminGuard],
    pathMatch : 'full'  ,
    data: { animation: 'billListPage' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
