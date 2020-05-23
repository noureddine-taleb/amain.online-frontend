import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { AlertService } from 'ngx-alerts';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  projectForm: FormGroup;
  errors:any[] = [];
  loading = false;

  constructor(private formBuilder: FormBuilder,private projectService: ProjectService,private alertService:AlertService, private router: Router ) { }

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      name: [
        '',
        [Validators.required,Validators.minLength(5)]
      ],
      desc: [
        '',
        [Validators.required,Validators.minLength(20)]
      ],
      fees: [
        '',
        [Validators.required,Validators.min(0)]
      ],
    })
  }

  submit(data){
    this.showLoader();
    this.projectService.create(data).subscribe(res => {
      this.hideLoader();
      this.alertService.success(res["feedback"]);
      setTimeout(() => this.router.navigate(["/dashboard/project-list"]), 2000);
    },(err:HttpErrorResponse) => {
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

}
