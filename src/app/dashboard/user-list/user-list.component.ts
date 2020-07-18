import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { BillService } from 'src/app/services/bill.service';
import { AlertService } from 'ngx-alerts';
import { ProjectService } from 'src/app/services/project.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: any[] = [];
  user: any;
  faPlusCircle = faPlusCircle;
  billForm : FormGroup;
  errors:any[] = [];
  projects:any[] = [];
  loading = false;
  p:number = 1;
  prefix = `${environment.api}${environment.imgPrefix}`;

  constructor(private projectService: ProjectService, private billService: BillService, private formBuilder: FormBuilder, private userService: UserService, private router: Router,private sanitizer: DomSanitizer,private alertService: AlertService, private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinnerService.show();
    this.userService.index().subscribe(res => {
    this.spinnerService.hide();
      this.users = res['data'];
     },() => this.spinnerService.hide());

    this.projectService.index().subscribe(res => (this.projects = res['data']) )
    
    this.billForm = this.formBuilder.group({
      user_id:[
        '',
        [Validators.required]
      ],
      project_id:[
        '',
        [Validators.required]
      ],
      weight:[
        '',
        [Validators.required, Validators.min(0.1)]
      ]
    });
  }

  billsList(user){
    this.router.navigate([ 'dashboard/bill-list', user.id]);
  }

  addBill(user){
    this.user = user;
    this.billForm.patchValue({user_id: this.user.id});
  }

  submit(data){
    if(this.billForm.invalid) return;
    this.showLoader();
    this.billService.create(data).subscribe((data) => {
      this.hideLoader();
      this.alertService.success(data["feedback"]);
      document.getElementById("close-modal").click();
    }, 
      (err:HttpErrorResponse) => {
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

  getSafeUrl(user){
    return this.sanitizer.bypassSecurityTrustUrl(`${this.prefix}${user.image}`);
  }
}
