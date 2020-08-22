import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { IsNotAuthGuard } from '../core/guards/is-not-auth.guard';
import { RegisterFormComponent } from './register-form/register-form.component';

const routes: Routes = [
  {
    path: '',
    component : LoginFormComponent,
    canActivate : [IsNotAuthGuard],
    pathMatch : 'full',
    data: { animation: 'loginFormPage' }
  },
  {
    path: 'register',
    component : RegisterFormComponent,
    canActivate : [IsNotAuthGuard],
    pathMatch : 'full',
    data: { animation: 'registerFormPage' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
