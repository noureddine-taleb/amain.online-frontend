import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { User } from '../../models/user/user';
import { ValidationService } from '../../services/validation/validation.service';
import { AnalyticsService } from '../../services/analytics/analytics.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm : FormGroup;
  errors:any[] = [];
  loading = false;

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService,
    private validationService: ValidationService,
    private router: Router,
    private alertService: AlertService,
    private analyticsService: AnalyticsService,
    ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      phone : [
        '',
        [Validators.required, Validators.pattern(this.validationService.phoneRegexp)]
      ],
      password : [
        '',
        Validators.required
      ],
      rememberme : [
        true
      ]
    });
  }
      
  submit(data: User){
    this.analyticsService.event('engagement', 'login', 'method', this.loginForm.valid ? 1 : 0)
    
    if(this.loginForm.invalid) return;
    this.showLoader();
    this.userService.login(data).subscribe( 
      _ => 
      {
      this.alertService.success("user login with success");
      setTimeout(() => this.router.navigate(["/"]), 2000)
    },
    err => {
      this.hideLoader();
      this.alertService.danger('error occured');
      if(err.status == 422){
        this.errors = err.error['errors'];
      }
    });
  }

  showLoader(){
    this.loading = true;
  }

  hideLoader(){
    this.loading = false;
  }

}
