import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {

  payments:any[] = [];

  constructor(private paymentService:PaymentService) { }

  ngOnInit(): void {
    this.paymentService.index().subscribe(res => {
      this.payments = res['data'];
    })
  }

}
