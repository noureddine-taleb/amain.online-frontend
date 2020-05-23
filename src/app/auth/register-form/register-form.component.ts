import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit 
{

  registerForm: FormGroup;
  errors: any[] = [];
  uploadStatus: { status: boolean, progress: number} = {status: false, progress: 0};
  loading = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router:Router,private alertService: AlertService) 
  { }


  ngOnInit(): void 
  {
    this.registerForm = this.formBuilder.group({
      name: [ 
        '',
        [Validators.required, Validators.pattern("^[a-zA-Z ]+$") ]
       ],
      phone: [ 
        '',
        [Validators.required, Validators.pattern("^[0-9]{10}$") ]
       ],
      dob: [ 
        '',
        [Validators.required]
       ],
      image_path: [
        '',
        [ Validators.required ]
       ],
      image: [
        '',
        [Validators.required, this.userService.fileValidator(/\.jpe?g$/gi, document.getElementById("image")) ]
       ],
      password: [
        '',
        [Validators.required, Validators.minLength(5)]
       ],
      password_confirmation: [ 
        '',
        [this.userService.matchValues('password')]
       ],
       terms_and_conditions: [ 
        true,
        [Validators.requiredTrue]
       ],
    }
    );
  }
  
  submit(data: any) 
  {
    if(this.registerForm.invalid) 
      return;
    this.showLoader();
    this.userService.create(data).subscribe(data => {
      this.hideLoader();
      this.alertService.success(data["feedback"]);
      setTimeout(() => {
        this.router.navigate(['/auth/login-form']);
      },2000);
    },
      (err:HttpErrorResponse) => {
        this.hideLoader();
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
      console.log(res);
      if(res.type === HttpEventType.UploadProgress){
        
        this.uploadStatus = { status: true, progress: (res.loaded / res.total) * 100}
      }
      else if(res.type === HttpEventType.Response){

        this.uploadStatus.status = false;
        this.registerForm.patchValue({image_path : res["body"]["data"] });
        this.alertService.success('file uploaded successfully');
      }
    },err => {
      this.alertService.danger('fail to upload file');
    });
  }

  showLoader(){
    this.loading = true;
  }

  hideLoader(){
    this.loading = false;
  }
}
