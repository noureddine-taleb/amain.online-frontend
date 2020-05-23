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


const routes: Routes = [
  { path: '', redirectTo : 'dashboard/user-list', pathMatch: "full"},
  { path: 'auth/login-form', component : LoginFormComponent, canActivate : [AuthGuard],   pathMatch : 'full'  },
  { path: 'auth/register-form', component : RegisterFormComponent, canActivate : [AuthGuard],   pathMatch : 'full'  },

  { path: 'dashboard/project-form', component : ProjectFormComponent , canActivate : [CanActivateGuard],   pathMatch : 'full'  },
  { path: 'dashboard/project-list', component : ProjectListComponent , canActivate : [CanActivateGuard],   pathMatch : 'full'  },

  { path: 'dashboard/user-list', component : UserListComponent , canActivate : [CanActivateGuard],   pathMatch : 'full'  },
  
  // { path: 'dashboard/bill-list', component : BillListComponent , canActivate : [CanActivateGuard],   pathMatch : 'full'  },
  { path: 'dashboard/bill-list/:user-id', component : BillListComponent , canActivate : [CanActivateGuard],   pathMatch : 'full'  },
  
  { path: '404', component: Page404Component,   pathMatch : 'full' },
  { path: '500', component: Page500Component,   pathMatch : 'full' },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
