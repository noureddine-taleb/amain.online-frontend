import { Component, OnInit } from '@angular/core';
import { Treasury } from '../../core/models/treasury/treasury';
import { HttpErrorResponse } from '@angular/common/http';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { TreasuryService } from '../../services/treasury/treasury.service';
import { ProjectService } from '../../services/project/project.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Project } from '../../core/models/project/project';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import Typed from 'typed.js';
import { UserService } from '../../services/user/user.service';
import { SeoService } from '../../services/seo/seo.service';
import { Subscription } from 'rxjs';
import { SeoAlertService } from '../../services/AlertServiceSeo/alert-service-seo.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  protected subs: Subscription[] = []
  treasuryForm: FormGroup
  errors: any[] = []
  loading = false
  projects: Project[] = []

  constructor(
    private formBuilder: FormBuilder,
    private treasuryService: TreasuryService,
    private alertService: SeoAlertService,
    private projectService: ProjectService,
    private spinnerService: NgxSpinnerService,
    private router: Router,
    private analyticsService: AnalyticsService,
    private userService: UserService,
    private seoService: SeoService,
    ) { }

  ngOnInit(): void {
    this.seoService.setTitleDesc('new transaction', 'place where to add non regular spending and earning')
    this.typed()
    this.spinnerService.show()
    const projSub = this.projectService.getAll().subscribe(res => {
    this.spinnerService.hide()
    this.projects = res['projects']
  },
  _ => this.spinnerService.hide()
  )
    this.subs.push(projSub
    )

    this.treasuryForm = this.formBuilder.group({
      name: [
        '',
        [Validators.required, Validators.minLength(5)]
      ],
      projectID: [
        ''
      ],
      desc: [
        '',
        [Validators.required, Validators.minLength(10)]
      ],
      amount: [
        '',
        [Validators.required]
      ],
    })
  }

  submit(data: Treasury){
    this.analyticsService.event('productivity', 'create_treasury_record', 'method', this.treasuryForm.valid ? 1 : 0)
    if (this.treasuryForm.invalid) { return }
    this.showLoader()
    const treasSub = this.treasuryService.create(new Treasury(data.name, data.desc, data.amount, data.projectID, this.userService.getUserID()))
  .subscribe(
  _ => {
    this.alertService.success("#transaction-success")
    setTimeout(() => this.router.navigate(['dashboard', 'reports']), 2000)
  }, (err: HttpErrorResponse) => {
    this.hideLoader()
    this.alertService.danger("#transaction-danger")
    if (err.status == 422){
      this.errors = err.error.errors
    }
  })
    this.subs.push(treasSub
    )
  }

  showLoader(){
    this.loading = true
  }

  hideLoader(){
    this.loading = false
  }

  typed() {
    const options = {
      stringsElement: '#typed-strings2',
      typeSpeed: 65,
      backSpeed: 15,
      smartBackspace: true,
      attr: 'placeholder',
      bindInputFocusEvents: true,
      // cursorChar: '|',
      loop: true,
    };
    new Typed('#desc', options);
  }

  public ngOnDestroy() {
    for (const s of this.subs) {
      s.unsubscribe()
    }
  }
}
