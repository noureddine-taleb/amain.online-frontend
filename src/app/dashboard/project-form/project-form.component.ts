import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project/project.service';
import { AlertService } from 'ngx-alerts';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Project } from '../../core/models/project/project';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import Typed from 'typed.js';
import { UserService } from '../../services/user/user.service';
import { SeoService } from '../../services/seo/seo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  protected subs: Subscription[] = []
  projectForm: FormGroup;
  errors: any[] = [];
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private userService: UserService,
    private alertService: AlertService,
    private router: Router,
    private analyticsService: AnalyticsService,
    private seoService: SeoService,
    ) { }

  ngOnInit(): void {
    this.seoService.setTitleDesc('new project', 'create new project into db')
    this.typed()
    this.projectForm = this.formBuilder.group({
      name: [
        '',
        [Validators.required, Validators.minLength(5)]
      ],
      desc: [
        '',
        [Validators.required, Validators.minLength(10)]
      ],
      fees: [
        '',
        [Validators.required, Validators.min(0)]
      ],
      unit: [
        '',
        [Validators.required, Validators.maxLength(5)]
      ],
    })
  }

  submit(data: Project){
    this.analyticsService.event('productivity', 'create_project', 'method', this.projectForm.valid ? 1 : 0)
    if (this.projectForm.invalid) { return }
    this.showLoader();
    const projSub = this.projectService.create(new Project(data.name, data.desc, data.fees, data.unit, this.userService.getUserID()))
    .subscribe(
    _ => {
      this.alertService.success('تم إنشاء المشروع بنجاح');
      setTimeout(() => this.router.navigate(['dashboard', 'projects']), 2000);
    }, (err: HttpErrorResponse) => {
      this.hideLoader();
      this.alertService.danger('حدث خطأ');
      if (err.status == 422){
        this.errors = err.error.errors;
      }
    })
    this.subs.push(projSub
      )

  }

  showLoader(){
    this.loading = true;
  }

  hideLoader(){
    this.loading = false;
  }

  typed() {
    const options = {
      stringsElement: '#typed-strings1',
      typeSpeed: 65,
      backSpeed: 15,
      smartBackspace: true,
      attr: 'placeholder',
      bindInputFocusEvents: true,
      cursorChar: '|',
      loop: true,
    };
    new Typed('#name', options);
  }

  public ngOnDestroy() {
    for (const s of this.subs) {
      s.unsubscribe()
    }
  }
}
