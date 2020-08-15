import { Component, OnInit, Input, PLATFORM_ID, Inject } from '@angular/core';
import { Bill } from '../../models/bill/bill';
import { BillService } from '../../services/bill/bill.service';
import { AlertService } from 'ngx-alerts';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PaymentService } from '../../services/payment/payment.service';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { isPlatformBrowser } from '@angular/common';
import { Payment } from '../../models/payment/payment';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-bill-table',
  templateUrl: './bill-table.component.html',
  styleUrls: ['./bill-table.component.css']
})
export class BillTableComponent implements OnInit {

  @Input()bills: Bill[]
  @Input()from: string
  p: number = 1
  loading: boolean = false;
  blob: Blob;
  url: SafeResourceUrl;
  __url: string;
  bill: Bill;

  constructor(
    private billService: BillService, 
    private alertService: AlertService, 
    private sanitizer: DomSanitizer, 
    private paymentService: PaymentService, 
    private analyticsService: AnalyticsService,
    private userService: UserService, 
    @Inject(PLATFORM_ID) private platform: object, 
  ) 
  {}

  ngOnInit(): void {
  }

  downloadBill(bill: Bill){
    this.url = null;
    this.showLoader();
    this.billService.download(bill._id).subscribe(res => {
      this.hideLoader();
      this.blob = new window.Blob([res], {type : 'application/pdf'});
      this.__url = window.URL.createObjectURL(this.blob)
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.__url);
    }, () => {
      this.hideLoader();
      this.alertService.danger("فشل التنزيل");
    });
  }


  saveBill(bill: Bill){
    this.bill = bill;
  }

  paymentConfirmation(){
    this.analyticsService.event('productivity', 'create_payment', 'method')
    if(this.bill) {
      this.showLoader();
      this.paymentService.create(new Payment(this.bill._id, this.userService.getUserID())).subscribe(_ => {
        this.hideLoader();
        if(isPlatformBrowser(this.platform))
          window.document.getElementById("close-modal1").click();
        this.alertService.success("تمت إضافة الدفع بنجاح");
        this.ngOnInit();
      }, () => {
        this.hideLoader();
        this.alertService.danger("تفشل في إضافة الدفع");
      });
    }
  }

  modalClosed(): void {
    window.URL.revokeObjectURL(this.__url)
  }

  showLoader(){
    this.loading = true;
  }

  hideLoader(){
    this.loading = false;
  }

}
