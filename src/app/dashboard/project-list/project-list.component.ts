import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project/project.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Project } from '../../models/project/project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: Project[] = [];
  p: number = 1;
  
  constructor(
    private projectService: ProjectService, 
    private spinnerService: NgxSpinnerService
    ) { }

  ngOnInit(): void {
    this.spinnerService.show()
    this.projectService.getAll().subscribe(res => {
      this.spinnerService.hide()
      this.projects = res['projects']
    }, 
    _ => this.spinnerService.hide()
    )
  }

}
