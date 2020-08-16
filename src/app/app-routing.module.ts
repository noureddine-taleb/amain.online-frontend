import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { RegisterFormComponent } from './auth/register-form/register-form.component';
import { IsAuthGuard } from './guards/is-auth.guard';
import { IsNotAuthGuard } from './guards/is-not-auth.guard';
import { IsAdminGuard } from './guards/is-admin.guard';

import { ProjectFormComponent } from './dashboard/project-form/project-form.component';
import { ProjectListComponent } from './dashboard/project-list/project-list.component';

import { BillListComponent } from './dashboard/bill-list/bill-list.component';

import { UserListComponent } from './dashboard/user-list/user-list.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportsComponent } from './dashboard/reports/reports.component';
import { TransactionsComponent } from './dashboard/transactions/transactions.component';


const routes: Routes = [
  {
    path: 'auth/login',
    component : LoginFormComponent,
    canActivate : [IsNotAuthGuard],
    pathMatch : 'full',
    data: { animation: 'loginFormPage' }
  },
  {
    path: 'auth/register',
    component : RegisterFormComponent,
    canActivate : [IsNotAuthGuard],
    pathMatch : 'full',
    data: { animation: 'registerFormPage' }
  },
  // main app
  {
    path: '',
    component : DashboardComponent,
    children: [
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
                    component : ProjectListComponent ,
                    canActivate : [IsAuthGuard],
                    pathMatch : 'full'  ,
                    data: { animation: 'projectsPage' }
                  },
                  {
                    path: 'projects/create',
                    component : ProjectFormComponent ,
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
  ]
  },

  {
    path: '404',
    component: Page404Component,
    pathMatch : 'full' ,
    data: { animation: '404Page' }
  },
  {
    path: '500',
    component: Page500Component,
    pathMatch : 'full' ,
    data: { animation: '500Page' }
  },
  {
    path: '**',
    redirectTo: '404'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
