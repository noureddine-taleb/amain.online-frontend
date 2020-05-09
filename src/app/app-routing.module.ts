import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { RegisterFormComponent } from './auth/register-form/register-form.component';
import { CanActivateGuard } from './guards/can-activate.guard';
import { AuthGuard } from './guards/auth.guard';

import { PaymentFormComponent } from './dashboard/payment-form/payment-form.component';
import { PaymentListComponent } from './dashboard/payment-list/payment-list.component';
import { PaymentSingleComponent } from './dashboard/payment-single/payment-single.component';

import { ProjectFormComponent } from './dashboard/project-form/project-form.component';
import { ProjectListComponent } from './dashboard/project-list/project-list.component';
import { ProjectSingleComponent } from './dashboard/project-single/project-single.component';

import { BillFormComponent } from './dashboard/bill-form/bill-form.component';
import { BillListComponent } from './dashboard/bill-list/bill-list.component';
import { BillSingleComponent } from './dashboard/bill-single/bill-single.component';

import { UserFormComponent } from './dashboard/user-form/user-form.component';
import { UserListComponent } from './dashboard/user-list/user-list.component';
import { UserSingleComponent } from './dashboard/user-single/user-single.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';


const routes: Routes = [
  { path: '', redirectTo : 'auth/login-form', pathMatch: "full"},
  { path: 'auth/login-form', component : LoginFormComponent, canActivate : [AuthGuard],   pathMatch : 'full'  },
  { path: 'auth/register-form', component : RegisterFormComponent, canActivate : [AuthGuard],   pathMatch : 'full'  },

  { path: 'dashboard/project-form', component : ProjectFormComponent , canActivate : [CanActivateGuard],   pathMatch : 'full'  },
  { path: 'dashboard/project-list', component : ProjectListComponent , canActivate : [CanActivateGuard],   pathMatch : 'full'  },
  { path: 'dashboard/project-single', component : ProjectSingleComponent , canActivate : [CanActivateGuard],   pathMatch : 'full'  },

  { path: 'dashboard/user-form', component : UserFormComponent , canActivate : [CanActivateGuard],   pathMatch : 'full'  },
  { path: 'dashboard/user-list', component : UserListComponent , canActivate : [CanActivateGuard],   pathMatch : 'full'  },
  { path: 'dashboard/user-single', component : UserSingleComponent , canActivate : [CanActivateGuard],   pathMatch : 'full'  },
  
  { path: 'dashboard/bill-form', component : BillFormComponent , canActivate : [CanActivateGuard],   pathMatch : 'full'  },
  { path: 'dashboard/bill-list', component : BillListComponent , canActivate : [CanActivateGuard],   pathMatch : 'full'  },
  { path: 'dashboard/bill-single', component : BillSingleComponent , canActivate : [CanActivateGuard],   pathMatch : 'full'  },

  { path: 'dashboard/payment-form', component : PaymentFormComponent , canActivate : [CanActivateGuard],   pathMatch : 'full'  },
  { path: 'dashboard/payment-list', component : PaymentListComponent , canActivate : [CanActivateGuard],   pathMatch : 'full'  },
  { path: 'dashboard/payment-single', component : PaymentSingleComponent , canActivate : [CanActivateGuard],   pathMatch : 'full'  },
  
  { path: '404', component: Page404Component,   pathMatch : 'full' },
  { path: '500', component: Page500Component,   pathMatch : 'full' },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
