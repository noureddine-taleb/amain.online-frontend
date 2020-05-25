import { Component, OnInit } from '@angular/core';
import { BillService } from 'src/app/services/bill.service';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'ngx-alerts';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { faPrint } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  bills: any[] = [];
  bill: any = null;
  faPrint = faPrint;
  blob: Blob;
  url;
  userId;
  loading = false;
  p: number = 1;
  
  constructor(private billService: BillService, private userService: UserService, private alertService: AlertService, private sanitizer: DomSanitizer, private route: ActivatedRoute, private spinnerService: NgxSpinnerService) 
  {}

  ngOnInit(): void {
    this.userId = this.userService.getUser()['id'];
    this.spinnerService.show();
    
    this.userService.bills(this.userId).subscribe(res => {
      this.spinnerService.hide();
      this.bills = res['data'];
    },() => this.spinnerService.hide() );

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

  showLoader(){
    this.loading = true;
  }

  hideLoader(){
    this.loading = false;
  }
}
