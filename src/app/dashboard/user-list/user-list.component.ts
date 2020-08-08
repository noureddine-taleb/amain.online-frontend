import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { BillService } from '../../services/bill/bill.service';
import { AlertService } from 'ngx-alerts';
import { ProjectService } from '../../services/project/project.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { User } from '../../models/user/user';
import { Project } from '../../models/project/project';
import { Bill } from '../../models/bill/bill';
import { AnalyticsService } from '../../services/analytics/analytics.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  user: User;
  faPlusCircle = faPlusCircle;
  billForm : FormGroup;
  errors:any[] = [];
  projects:Project[] = [];
  loading = false;
  p:number = 1;
  prefix = `${environment.UPLOAD_FOLDER}`;
  constructor(
    @Inject(PLATFORM_ID) private platform, 
    private projectService: ProjectService, 
    private billService: BillService, 
    private formBuilder: FormBuilder, 
    private userService: UserService, 
    private router: Router,
    private sanitizer: DomSanitizer,
    private alertService: AlertService, 
    private spinnerService: NgxSpinnerService,
    private analyticsService: AnalyticsService,
  ) {}

  ngOnInit(): void {
    this.spinnerService.show();
    this.userService.getAll().subscribe(res => {
    this.spinnerService.hide();
      this.users = res['users'];
     },() => this.spinnerService.hide());

    this.projectService.getAll().subscribe(res => (this.projects = res['projects']) )
    
    this.billForm = this.formBuilder.group({
      userID:[
        '',
        [Validators.required]
      ],
      projectID:[
        '',
        [Validators.required]
      ],
      quantity:[
        '',
        [Validators.required, Validators.min(0.1)]
      ]
    });
  }

  billsList(user: User){
    this.router.navigate([ '/', 'dashboard', 'users', user._id, 'bills']);
  }

  addBill(user: User){
    this.user = user;
    this.billForm.patchValue({userID: this.user._id});
  }

  submit(data: Bill){
    this.analyticsService.event('productivity', 'create_bill', 'method', this.billForm.valid ? 1 : 0)

    if(this.billForm.invalid) return;
    this.showLoader();
    this.billService.create(new Bill(data.userID, data.projectID, data.quantity)).subscribe((data) => {
      this.hideLoader();
      this.alertService.success("تم إنشاء الفاتورة بنجاح");
      if(isPlatformBrowser(this.platform))
        document.getElementById("close-modal").click();
    }, 
      (err:HttpErrorResponse) => {
        this.hideLoader();
        this.alertService.danger('حدث خطأ');
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

  getSafeUrl(user: User){
    return this.sanitizer.bypassSecurityTrustUrl(`${this.prefix}${user.image}`);
  }
}
