import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm : FormGroup;
  errors:any[] = [];
  loading = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService,private router: Router,private alertService: AlertService,private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      phone : [
        '',
        [Validators.required, Validators.pattern(this.userService.phoneRegexp)]
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
    if(this.loginForm.invalid) return;
    this.showLoader();
    this.userService.login(data).subscribe( res => {
      this.alertService.success(res["feedback"]);
      setTimeout(() => {
        this.router.navigate(["/"]);
      },2000);
    },(err:HttpErrorResponse) => {
      this.hideLoader();
      this.alertService.danger('error occured');
      if(err.status == 422){
        this.errors = err.error['errors'];
      }
    },() => {
      this.hideLoader();
    });
  }

  showLoader(){
    this.loading = true;
  }

  hideLoader(){
    this.loading = false;
  }

}
