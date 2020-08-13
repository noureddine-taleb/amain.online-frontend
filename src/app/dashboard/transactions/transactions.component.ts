import { Component, OnInit } from '@angular/core';
import { Treasury } from '../../models/treasury/treasury';
import { HttpErrorResponse } from '@angular/common/http';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { TreasuryService } from '../../services/treasury/treasury.service';
import { ProjectService } from '../../services/project/project.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Project } from '../../models/project/project';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import Typed from 'typed.js';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  treasuryForm: FormGroup
  errors:any[] = []
  loading = false
  projects: Project[] = []
  projectID: string

  constructor(
    private formBuilder: FormBuilder,
    private treasuryService: TreasuryService,
    private alertService:AlertService, 
    private projectService: ProjectService,
    private spinnerService: NgxSpinnerService,
    private router: Router,
    private analyticsService: AnalyticsService,
    ) { }

  ngOnInit(): void {
    this.typed()
    this.spinnerService.show()
    this.projectService.getAll().subscribe(res => {
      this.spinnerService.hide()
      this.projects = res['projects']
    }, 
    _ => this.spinnerService.hide()
    )

    this.treasuryForm = this.formBuilder.group({
      name: [
        '',
        [Validators.required,Validators.minLength(5)]
      ],
      desc: [
        '',
        [Validators.required,Validators.minLength(10)]
      ],
      amount: [
        '',
        [Validators.required]
      ],
    })
  }

  submit(data: Treasury){
    this.analyticsService.event('productivity', 'create_treasury_record', 'method', this.treasuryForm.valid ? 1 : 0)
    if(this.treasuryForm.invalid) return
    this.showLoader()
    this.treasuryService.create(new Treasury(data.name, data.desc, data.amount, this.projectID)).subscribe(
    _ => {
      this.alertService.success("تم إنشاء السجل بنجاح")
      setTimeout(() => this.router.navigate(["/", "dashboard", "reports"]), 2000)
    },(err:HttpErrorResponse) => {
      this.hideLoader()
      this.alertService.danger('حدث خطأ')
      if(err.status == 422){
        this.errors = err.error['errors']
      }
    })
  }

  showLoader(){
    this.loading = true
  }

  hideLoader(){
    this.loading = false
  }

  typed() {
    const options = {
      strings: [
        'شراء بعض المعدات',
        'الاعمال الخيرية',
        'صيانة المساجد',
        'بناء الطريق',
      ],
      typeSpeed: 65,
      backSpeed: 15,
      smartBackspace: true,
      attr: 'placeholder',
      bindInputFocusEvents: true,
      cursorChar: '_',
      loop: true,
    };
    new Typed('#project-desc', options);
  }
}
