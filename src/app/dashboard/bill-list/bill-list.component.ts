import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { BillService } from '../../services/bill/bill.service';
import { PaymentService } from '../../services/payment/payment.service';
import { AlertService } from 'ngx-alerts';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Bill } from '../../models/bill/bill';
import { Payment } from '../../models/payment/payment';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit {

  bills: Bill[] = [];
  bill: Bill = null;
  blob: Blob;
  url: SafeResourceUrl;
  __url: string;
  userId: string;
  loading = false;
  p: number = 1;
  
  constructor(
    private billService: BillService, 
    private userService: UserService, 
    private paymentService: PaymentService, 
    private alertService: AlertService,
    private sanitizer: DomSanitizer, 
    private route: ActivatedRoute, 
    private spinnerService: NgxSpinnerService,
    private analyticsService: AnalyticsService,
    @Inject(PLATFORM_ID) private platform: object, 
    ) 
  {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userID');
    this.spinnerService.show();
    if(this.userId){
      this.userService.bills(this.userId).subscribe(res => {
        this.spinnerService.hide();
        this.bills = res['bills'];
      },() => this.spinnerService.hide() );
    
    }else {
      this.billService.getAll().subscribe(res => {
        this.spinnerService.hide();
        this.bills = res['bills'];
      },() => this.spinnerService.hide() );
    }
  }

  saveBill(bill: Bill){
    this.bill = bill;
  }
  
  downloadBill(bill: Bill){
    this.url = null;
    this.bill = bill;
    this.showLoader();
    this.billService.download(this.bill._id).subscribe(res => {
      this.hideLoader();
      this.blob = new window.Blob([res], {type : 'application/pdf'});
      this.__url = window.URL.createObjectURL(this.blob)
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.__url);
    }, () => {
      this.hideLoader();
      this.alertService.danger("فشل التنزيل");
    });
  }

  modalClosed(): void{
    window.URL.revokeObjectURL(this.__url);
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

  showLoader(){
    this.loading = true;
  }

  hideLoader(){
    this.loading = false;
  }

}
