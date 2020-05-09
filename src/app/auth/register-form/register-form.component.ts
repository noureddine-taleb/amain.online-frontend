import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit 
{

  registerForm : FormGroup;
  errors:any[] = [];

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router:Router,private alertService: AlertService) 
  { }


  ngOnInit(): void 
  {
    this.registerForm = this.formBuilder.group({
      name: [ 
        '',
        [Validators.required, Validators.pattern("^[a-zA-Z]+$") ]
       ],
      phone: [ 
        '',
        [Validators.required, Validators.pattern("^[0-9]{10}$") ]
       ],
      dob: [ 
        '',
        [Validators.required]
       ],
      image: [
        '',
        [Validators.required, this.userService.fileTypeValidator(/\.jpe?g$/gi, document.getElementById("image")) ]
       ],
      password: [
        '',
        [Validators.required, Validators.minLength(5)]
       ],
      password_confirmation: [ 
        '',
        [Validators.required, Validators.minLength(5)]
       ],
       terms_and_conditions: [ 
        true,
        [Validators.requiredTrue]
       ],
    }, { validators: this.userService.passwordConfirmValidator });
  }
  
  submit(data: any) 
  {
    if(this.registerForm.invalid) 
      return;
    this.userService.create(data).subscribe(console.log,
      (err:HttpErrorResponse) => {
        this.alertService.danger('error occured');
        if(err.status == 422){
          this.errors = err.error['errors'];
        }
    });
  }

  upload($event: any)
  {
    if(this.registerForm.get("image").invalid) return;

    let formData = new FormData();
    formData.append("image",$event.target.files[0]);
    this.userService.upload(formData).subscribe(res => {
      this.registerForm.patchValue({image : res["message"] });
    }, console.log);
  }
}
