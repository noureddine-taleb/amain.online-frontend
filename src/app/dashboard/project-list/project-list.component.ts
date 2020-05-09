import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: any[] = [];
  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.index().subscribe(res => {
      this.projects = res['data'];
    })
  }

}
