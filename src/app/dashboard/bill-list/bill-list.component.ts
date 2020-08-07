import { Component, OnInit } from '@angular/core';
import { BillService } from '../../services/bill/bill.service';
import { PaymentService } from '../../services/payment/payment.service';
import { AlertService } from 'ngx-alerts';
import { faMoneyBillAlt,faPrint } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Bill } from '../../models/bill/bill';
import { Payment } from '../../models/payment/payment';
import { AnalyticsService } from '../../services/analytics/analytics.service';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit {

  bills: Bill[] = [];
  bill: Bill = null;
  faMoneyBillAlt = faMoneyBillAlt;
  faPrint = faPrint;
  blob: Blob;
  url: SafeResourceUrl;
  userId;
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

  saveBill(bill){
    this.bill = bill;
  }
  
  downloadBill(bill){
    this.bill = bill;
    this.showLoader();
    this.billService.download(this.bill._id).subscribe(res => {
      this.hideLoader();
      this.blob = new Blob([res], {type : 'application/pdf'});
      this.url = URL.createObjectURL(this.blob);
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(<string>this.url);
    }, () => {
      this.hideLoader();
      this.alertService.danger("download failure");
    });
  }

  paymentConfirmation(){
    this.analyticsService.event('productivity', 'create_payment', 'method')
    if(this.bill) {
      this.showLoader();
      this.paymentService.create(new Payment(this.bill._id)).subscribe(res => {
        this.hideLoader();
        this.alertService.success(res["feedback"]);
        this.ngOnInit();
      }, () => {
        this.hideLoader();
        this.alertService.danger("fail to add payment");
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
