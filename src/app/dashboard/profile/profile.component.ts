import { Component, OnInit } from '@angular/core';
import { BillService } from '../../services/bill/bill.service';
import { UserService } from '../../services/user/user.service';
import { AlertService } from 'ngx-alerts';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { Bill } from '../../models/bill/bill';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  bills: Bill[] = [];
  bill: Bill;
  blob: Blob;
  url: SafeResourceUrl;
  __url: string;
  loading: boolean = false;
  p: number = 1;
  
  constructor(
    private billService: BillService, 
    private userService: UserService, 
    private alertService: AlertService, 
    private sanitizer: DomSanitizer, 
    private spinnerService: NgxSpinnerService
    ) 
  {}

  ngOnInit(): void {
    this.spinnerService.show();
    this.userService.bills().subscribe(
    res => {
      this.spinnerService.hide();
      this.bills = res['bills'];
    },
    _ => this.spinnerService.hide() );

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
