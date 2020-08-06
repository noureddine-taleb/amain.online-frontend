import { Component, OnInit } from '@angular/core';
import { Report } from '../../models/report/report';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReportService } from '../../services/report/report.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  reports: Report[] = []
  total: number = 0
  p: number
  constructor(
    private spinnerService: NgxSpinnerService,
    private reportService: ReportService,
  ) {}

  ngOnInit(): void {
    this.spinnerService.show()
    this.reportService.getAll().subscribe(res => {
      this.spinnerService.hide()
      this.reports = res['reports']
      this.total = res['total']
    }, 
    _ => this.spinnerService.hide()
    )
  }

}
