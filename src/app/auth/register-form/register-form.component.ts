import { Component, OnInit, ViewChild, ElementRef, PLATFORM_ID, Inject } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { ValidationService } from '../../services/validation/validation.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { AnalyticsService } from '../../services/analytics/analytics.service';

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
  image: File;
  imageEl: HTMLElement

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService, 
    private router:Router,
    private alertService: AlertService,
    private validationService: ValidationService,
    @Inject(PLATFORM_ID) private platform,
    private analyticsService: AnalyticsService,
  )
  { }


  ngOnInit(): void 
  {
    if(isPlatformBrowser(this.platform)) this.imageEl = document.getElementById('image')
    this.registerForm = this.formBuilder.group({
      name: [ 
        '',
        [Validators.required, Validators.pattern(this.validationService.nameRegexp) ]
       ],
      phone: [ 
        '',
        [Validators.required, Validators.pattern(this.validationService.phoneRegexp) ]
       ],
      dob: [ 
        '',
        [Validators.required]
       ],
      image: [
        '',
        [
          Validators.required, 
          this.validationService.fileValidator(this.imageEl)
        ]
       ],
      password: [
        '',
        [Validators.required, Validators.minLength(5)]
       ],
      password_confirmation: [ 
        '',
        [ Validators.required, this.validationService.matchValidator('password') ]
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
    this.analyticsService.event('engagement', 'sign_up', 'method', this.registerForm.valid ? 1 : 0)

    if(this.registerForm.invalid) return;
    this.showLoader();
    const fileName = Date.now() + Math.random() + this.image.name;
    const userObs = this.userService.create({ ...data, image: fileName })//.pipe(map(_ => this.alertService.success("user created successfully")))
    const imageObs = this.userService.upload(this.image, fileName).pipe(map(res => {
      if(res.type === HttpEventType.UploadProgress){
        this.uploadStatus = { status: true, progress: (res.loaded / res.total) * 100}
      }
      else if(res.type === HttpEventType.Response){

        this.uploadStatus.status = false;
        // this.alertService.success('file uploaded successfully');
      }
    })
    )

    combineLatest([imageObs, userObs])
    .subscribe(_ => {
      this.hideLoader()
      this.alertService.success("user created successfully")
      setTimeout(() => this.router.navigate(['/', 'auth','login']), 2000)
    },
    _ => {
      this.hideLoader();
      this.alertService.danger('error occured')
    })
  }

  upload($event: any)
  {
    if(this.registerForm.get("image").invalid) return;
    this.image = $event.target.files[0] as File;
  }

  showLoader(){
    this.loading = true;
  }

  hideLoader(){
    this.loading = false;
  }
}
