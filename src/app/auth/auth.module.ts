import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { UserService } from '../services/user/user.service';
import { ValidationService } from '../services/validation/validation.service';
import { SeoService } from '../services/seo/seo.service';
import { AnalyticsService } from '../services/analytics/analytics.service';
import { ReactiveFormsModule } from '@angular/forms';
import { IsNotAuthGuard } from '../core/guards/is-not-auth.guard';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AuthComponent,
    LoginFormComponent,
    RegisterFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
  ],
  exports:[
    AuthComponent
  ],
  entryComponents: [
    AuthComponent
  ],
})
export class AuthModule { }
