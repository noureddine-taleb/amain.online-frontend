import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { AlertService } from 'ngx-alerts';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  projectForm: FormGroup;
  errors:any[] = [];

  constructor(private formBuilder: FormBuilder,private projectService: ProjectService,private alertService:AlertService ) { }

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
    this.projectService.create(data).subscribe(res => {
      this.alertService.success("project added successfully");
    },(err:HttpErrorResponse) => {
      this.alertService.danger('error occured');
      if(err.status == 422){
        this.errors = err.error['errors'];
      }
    });
  }

}
