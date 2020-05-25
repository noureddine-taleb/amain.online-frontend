import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: any[] = [];
  p: number = 1;
  
  constructor(private projectService: ProjectService, private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinnerService.show();
    this.projectService.index().subscribe(res => {
      this.spinnerService.hide();
      this.projects = res['data'];
    }, 
    () => this.spinnerService.hide()
    );
  }

}
