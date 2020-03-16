import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillFormComponent } from './bill/bill-form/bill-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', component : HomeComponent },
  { path: 'login', component : LoginFormComponent },
  { path: 'bill', component : BillFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
