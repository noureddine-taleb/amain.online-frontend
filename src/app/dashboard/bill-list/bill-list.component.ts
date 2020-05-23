import { Component, OnInit } from '@angular/core';
import { BillService } from 'src/app/services/bill.service';
import { PaymentService } from 'src/app/services/payment.service';
import { AlertService } from 'ngx-alerts';
import { faMoneyBillAlt,faPrint } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer } from '@angular/platform-browser';
import { Url } from 'url';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit {

  bills: any[] = [];
  bill: any = null;
  faMoneyBillAlt = faMoneyBillAlt;
  faPrint = faPrint;
  blob: Blob;
  url;
  userId;
  loading = false;

  constructor(private billService: BillService, private userService: UserService, private paymentService: PaymentService, private alertService: AlertService,private sanitizer: DomSanitizer, private route: ActivatedRoute, private spinnerService: NgxSpinnerService) 
  {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('user-id');
    this.spinnerService.show();
    if(this.userId){
      this.userService.bills(this.userId).subscribe(res => {
        this.spinnerService.hide();
        this.bills = res['data'];
      },() => this.spinnerService.hide() );
    
    }else {

      this.billService.index().subscribe(res => {
        this.spinnerService.hide();
        this.bills = res['data'];
      },() => this.spinnerService.hide() );
    }
  }

  saveBill(bill){
    this.bill = bill;
  }
  
  downloadBill(bill){
    this.bill = bill;
    this.showLoader();
    this.billService.download(this.bill.id).subscribe(res => {
      this.hideLoader();
      this.blob = new Blob([res], {type : 'application/pdf'});
      this.url = URL.createObjectURL(this.blob);
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    }, () => {
      this.hideLoader();
      this.alertService.danger("download failure");
    });
  }

  paymentConfirmation(){
    if(this.bill) {
      this.showLoader();
      this.paymentService.create({bill_id : this.bill.id}).subscribe(res => {
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
