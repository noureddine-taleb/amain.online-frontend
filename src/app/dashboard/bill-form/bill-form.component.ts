import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { BillService } from 'src/app/services/bill.service';
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from 'src/app/services/project.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-bill-form',
  templateUrl: './bill-form.component.html',
  styleUrls: ['./bill-form.component.css']
})
export class BillFormComponent implements OnInit {

  errors:any[] = [];
  billForm : FormGroup;
  users:any[] = [];
  projects:any[] = [];

  constructor(private formBuilder: FormBuilder, private billService: BillService, private userService: UserService, private projectService: ProjectService, private router:Router,private alertService: AlertService) { }

  ngOnInit(): void {
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
        [Validators.required, Validators.min(0)]
      ]
    })

    this.userService.index().subscribe(res => (this.users = res['data']) )
    this.projectService.index().subscribe(res => (this.projects = res['data']) )
  }

  submit(data){
    if(this.billForm.invalid) return;
    console.log(data);
    this.billService.create(data).subscribe(console.log, 
      (err:HttpErrorResponse) => {
        this.alertService.danger('error occured');
        if(err.status == 422){
          this.errors = err.error['errors'];
        }
      });
  }

}
