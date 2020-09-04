import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { BillService } from '../../services/bill/bill.service';
import { AlertService } from 'ngx-alerts';
import { ProjectService } from '../../services/project/project.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { User } from '../../core/models/user/user';
import { Project } from '../../core/models/project/project';
import { Bill } from '../../core/models/bill/bill';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { SeoService } from '../../services/seo/seo.service';
import { Subscription } from 'rxjs';
import { SeoAlertService } from '../../services/AlertServiceSeo/alert-service-seo.service';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  protected subs: Subscription[] = []
  users: User[] = [];
  user: User;
  billForm: FormGroup;
  errors: any[] = [];
  projects: Project[] = [];
  loading = false;
  p = 1;
  unit: string
  prefix = `${environment.UPLOAD_FOLDER}`;
  constructor(
    @Inject(PLATFORM_ID) private platform: object,
    private projectService: ProjectService,
    private billService: BillService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private alertService: SeoAlertService,
    private spinnerService: NgxSpinnerService,
    private analyticsService: AnalyticsService,
    private seoService: SeoService,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    this.seoService.setTitleDesc('table of users', 'show subscribed users')
    this.spinnerService.show();

    //graphql call
    const usrSub = this.apollo
    .watchQuery({
      query: gql`
        {
          users {
            _id
            name
            phone
            dob
            image
          }
        }
      `,
    })
    .valueChanges.subscribe(result => {
      this.spinnerService.hide()
      this.users = result.data['users']
    },
      _ => this.spinnerService.hide()
    );

    // const usrSub = this.userService.getAll().subscribe(res => {
    //   this.spinnerService.hide();
    //   this.users = res['users'];
    // }, () => this.spinnerService.hide())
    
    this.subs.push(usrSub
     )

     //graphql call
    const projSub = this.apollo
    .watchQuery({
      query: gql`
        {
          projects {
            _id
            name
            unit
          }
        }
      `,
    })
    .valueChanges.subscribe(result => {
      this.projects = result.data['projects']
    });

  //   const projSub = this.projectService.getAll()
  //  .subscribe(res => (this.projects = res['projects']) )
    
   this.subs.push(projSub)

    this.billForm = this.formBuilder.group({
      userID: [
        '',
        [Validators.required]
      ],
      projectID: [
        '',
        [Validators.required]
      ],
      quantity: [
        '',
        [Validators.required, Validators.min(0.1)]
      ]
    });
  }

  billsList(user: User){
    this.router.navigate(['dashboard', 'users', user._id, 'bills']);
  }

  addBill(user: User){
    this.user = user;
    this.billForm.patchValue({userID: this.user._id});
  }

  submit(data: Bill){
    this.analyticsService.event('productivity', 'create_bill', 'method', this.billForm.valid ? 1 : 0)

    if (this.billForm.invalid) { return; }
    this.showLoader();
    const billSub = this.billService.create(new Bill(data.userID, data.projectID, data.quantity, this.userService.getUserID()))
  .subscribe((data) => {
    this.alertService.success("#invoice-success");
    if (isPlatformBrowser(this.platform)) {
      window.document.getElementById('close-modal').click();
    }
    this.billForm.reset()
    this.hideLoader()
  },
    (err: HttpErrorResponse) => {
      this.hideLoader();
      this.alertService.danger("#invoice-danger");
      if (err.status == 422){
        this.errors = err.error.errors;
      }
    })
    this.subs.push(billSub
      )
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

  public ngOnDestroy() {
    for (const s of this.subs) {
      s.unsubscribe()
    }
  }
}
