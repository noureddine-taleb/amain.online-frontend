import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillFormComponent } from './dashboard/bill-form/bill-form.component';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { RegisterFormComponent } from './auth/register-form/register-form.component';
import { MainComponent } from './dashboard/main/main.component';
import { BillListComponent } from './dashboard/bill-list/bill-list.component';
import { PaymentFormComponent } from './dashboard/payment-form/payment-form.component';
import { PaymentListComponent } from './dashboard/payment-list/payment-list.component';
import { ProjectFormComponent } from './dashboard/project-form/project-form.component';
import { ProjectListComponent } from './dashboard/project-list/project-list.component';
import { ProjectSingleComponent } from './dashboard/project-single/project-single.component';
import { PaymentSingleComponent } from './dashboard/payment-single/payment-single.component';
import { BillSingleComponent } from './dashboard/bill-single/bill-single.component';
import { UserFormComponent } from './dashboard/user-form/user-form.component';
import { UserListComponent } from './dashboard/user-list/user-list.component';
import { UserSingleComponent } from './dashboard/user-single/user-single.component';


const routes: Routes = [
  { path: '', component : MainComponent },
  { path: 'login', component : LoginFormComponent },
  { path: 'register', component : RegisterFormComponent },
  { path: 'bill', component : BillFormComponent },
  { path: 'dashboard/main', component : MainComponent },

  { path: 'dashboard/project-form', component : ProjectFormComponent },
  { path: 'dashboard/project-list', component : ProjectListComponent },
  { path: 'dashboard/project-single', component : ProjectSingleComponent },

  { path: 'dashboard/user-form', component : UserFormComponent },
  { path: 'dashboard/user-list', component : UserListComponent },
  { path: 'dashboard/user-single', component : UserSingleComponent },
  
  { path: 'dashboard/bill-form', component : BillFormComponent },
  { path: 'dashboard/bill-list', component : BillListComponent },
  { path: 'dashboard/bill-single', component : BillSingleComponent },

  { path: 'dashboard/payment-form', component : PaymentFormComponent },
  { path: 'dashboard/payment-list', component : PaymentListComponent },
  { path: 'dashboard/payment-single', component : PaymentSingleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
