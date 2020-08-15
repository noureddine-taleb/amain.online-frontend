import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project/project.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Project } from '../../models/project/project';
import { SeoService } from '../../services/seo/seo.service';
import { empty } from 'rxjs';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  protected subs = empty().subscribe();
  projects: Project[] = [];
  p: number = 1;
  
  constructor(
    private projectService: ProjectService, 
    private spinnerService: NgxSpinnerService,
    private seoService: SeoService,
    ) { }

  ngOnInit(): void {
    this.seoService.setTitleDesc('table of projects', 'show available projects')
    this.spinnerService.show()
    this.subs.add(this.projectService.getAll().subscribe(res => {
      this.spinnerService.hide()
      this.projects = res['projects']
    }, 
    _ => this.spinnerService.hide()
    ))
  }

  public ngOnDestroy() {
    this.subs.unsubscribe(); 
  }
}
