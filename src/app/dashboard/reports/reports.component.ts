import { Component, OnInit } from '@angular/core';
import { Report } from '../../models/report/report';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReportService } from '../../services/report/report.service';
import { SeoService } from '../../services/seo/seo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  protected subs: Subscription[] = []
  reports: Report[] = []
  total = 0
  p: number
  other = '<other>'
  otherRep = '<آخر>'
  constructor(
    private spinnerService: NgxSpinnerService,
    private reportService: ReportService,
    private seoService: SeoService,
  ) {}

  ngOnInit(): void {
    this.seoService.setTitleDesc('reports', 'show aggregated reported of all data in the system')
    this.spinnerService.show()
    const repSub = this.reportService.getAll().subscribe(res => {
    this.spinnerService.hide()
    this.reports = res['reports']
    this.total = res['total']
  },
  _ => this.spinnerService.hide()
  )
    this.subs.push(repSub
    )
  }

  public ngOnDestroy() {
    for (const s of this.subs) {
      s.unsubscribe()
    }
  }
}
