import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { RegisterFormComponent } from './auth/register-form/register-form.component';
import { CanActivateGuard } from './guards/can-activate.guard';
import { AuthGuard } from './guards/auth.guard';

import { ProjectFormComponent } from './dashboard/project-form/project-form.component';
import { ProjectListComponent } from './dashboard/project-list/project-list.component';

import { BillListComponent } from './dashboard/bill-list/bill-list.component';

import { UserListComponent } from './dashboard/user-list/user-list.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { IsAdminGuard } from './guards/is-admin.guard';
import { ProfileComponent } from './dashboard/profile/profile.component';


const routes: Routes = [
  { path: '', redirectTo : 'dashboard/profile', pathMatch: 'full', data: {animation: 'homePage' }},
  { path: 'auth/login-form', component : LoginFormComponent, canActivate : [AuthGuard],   pathMatch : 'full'  , data: {animation: 'loginPage' }},
  { path: 'auth/register-form', component : RegisterFormComponent, canActivate : [AuthGuard],   pathMatch : 'full'  , data: {animation: 'registerPage' }},

  { path: 'dashboard/project-form', component : ProjectFormComponent , canActivate : [CanActivateGuard, IsAdminGuard],   pathMatch : 'full'  , data: {animation: 'addProjectPage' }},
  { path: 'dashboard/project-list', component : ProjectListComponent , canActivate : [CanActivateGuard, IsAdminGuard],   pathMatch : 'full'  , data: {animation: 'listProjectPage' }},

  { path: 'dashboard/user-list', component : UserListComponent , canActivate : [CanActivateGuard, IsAdminGuard],   pathMatch : 'full'  , data: {animation: 'userListPage' }},
  
  { path: 'dashboard/bill-list/:user-id', component : BillListComponent , canActivate : [CanActivateGuard, IsAdminGuard],   pathMatch : 'full'  , data: {animation: 'billListPage' }},
  { path: 'dashboard/profile', component : ProfileComponent , canActivate : [CanActivateGuard],   pathMatch : 'full'  , data: {animation: 'profilePage' }},
  
  { path: '404', component: Page404Component,   pathMatch : 'full' , data: {animation: '404Page' }},
  { path: '500', component: Page500Component,   pathMatch : 'full' , data: {animation: '500Page' }},
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
