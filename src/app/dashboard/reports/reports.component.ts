import { Component, OnInit } from '@angular/core';
import { Report } from '../../models/report/report';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReportService } from '../../services/report/report.service';
import { SeoService } from '../../services/seo/seo.service';
import { empty } from 'rxjs';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  protected subs = empty().subscribe();
  reports: Report[] = []
  total: number = 0
  p: number
  other: string = '<other>'
  otherRep: string = '<آخر>'
  constructor(
    private spinnerService: NgxSpinnerService,
    private reportService: ReportService,
    private seoService: SeoService,
  ) {}

  ngOnInit(): void {
    this.seoService.setTitleDesc('reports', 'show aggregated reported of all data in the system')
    this.spinnerService.show()
    this.subs.add(this.reportService.getAll().subscribe(res => {
      this.spinnerService.hide()
      this.reports = res['reports']
      this.total = res['total']
    }, 
    _ => this.spinnerService.hide()
    ))
  }

  public ngOnDestroy() {
    this.subs.unsubscribe(); 
  }
}
