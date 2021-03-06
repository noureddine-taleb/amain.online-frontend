import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project/project.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Project } from '../../core/models/project/project';
import { SeoService } from '../../services/seo/seo.service';
import { Subscription } from 'rxjs';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  protected subs: Subscription[] = []
  projects: Project[] = [];
  p = 1;

  constructor(
    private projectService: ProjectService,
    private spinnerService: NgxSpinnerService,
    private seoService: SeoService,
    private apollo: Apollo
    ) { }

  ngOnInit(): void {
    this.seoService.setTitleDesc('table of projects', 'show available projects')
    this.spinnerService.show()

    //graphql call
    const projSub = this.apollo
      .watchQuery({
        query: gql`
          {
            projects {
              _id
              name
              desc
              createdAt
              fees
              unit
            }
          }
        `,
      })
      .valueChanges.subscribe(result => {
        this.spinnerService.hide()
        this.projects = result.data['projects']
      },
        _ => this.spinnerService.hide()
      );

  //   const projSub = this.projectService.getAll().subscribe(res => {
  //   this.spinnerService.hide()
  //   this.projects = res['projects']
  // },
  // _ => this.spinnerService.hide()
  // )
    this.subs.push(projSub
    )
  }

  public ngOnDestroy() {
    for (const s of this.subs) {
      s.unsubscribe()
    }
  }
}
