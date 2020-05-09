import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CanActivateGuard } from 'src/app/guards/can-activate.guard';
import { AlertService } from 'ngx-alerts';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm : FormGroup;
  errors:any[] = [];

  constructor(private formBuilder: FormBuilder, private userService: UserService,private router: Router,private alertService: AlertService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      phone : [
        '',
        Validators.required
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
      
  submit(data: any){
    if(this.loginForm.invalid) return;

    this.userService.login(data).subscribe( res => {
      this.router.navigate(["/dashboard/bill-list"]);
    },(err:HttpErrorResponse) => {
      this.alertService.danger('error occured');
      if(err.status == 422){
        this.errors = err.error['errors'];
      }
    });

  }

}
