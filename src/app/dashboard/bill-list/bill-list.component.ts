import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { BillService } from '../../services/bill/bill.service';
import { PaymentService } from '../../services/payment/payment.service';
import { AlertService } from 'ngx-alerts';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Bill } from '../../models/bill/bill';
import { Payment } from '../../models/payment/payment';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { isPlatformBrowser } from '@angular/common';
import { SeoService } from '../../services/seo/seo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit {
  protected subs: Subscription[] = []
  bills: Bill[] = [];
  userId: string;
  loading = false;
  p = 1;

  constructor(
    private billService: BillService,
    private userService: UserService,
    private route: ActivatedRoute,
    private spinnerService: NgxSpinnerService,
    private seoService: SeoService,
    )
  {}

  ngOnInit(): void {
    this.seoService.setTitleDesc('the list of bill', 'show all system users bills')
    this.getBills()
  }

  getBills(): void{
    this.userId = this.route.snapshot.paramMap.get('userID');
    this.spinnerService.show();
    if (this.userId){
      const billSub = this.userService.bills(this.userId, { $include: 'payment' }).subscribe(res => {
      this.spinnerService.hide();
      this.bills = res.bills;
    }, () => this.spinnerService.hide() )
      this.subs.push(billSub)
    }else {
      const billSub = this.billService.getAll().subscribe(res => {
      this.spinnerService.hide();
      this.bills = res['bills'];
    }, () => this.spinnerService.hide() )
      this.subs.push(billSub)
    }
  }

  showLoader(){
    this.loading = true;
  }

  hideLoader(){
    this.loading = false;
  }

  public ngOnDestroy() {
    for (const s of this.subs) {
      s.unsubscribe()
    }
  }
}
