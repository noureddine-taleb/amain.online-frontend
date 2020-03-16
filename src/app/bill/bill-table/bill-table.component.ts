import { Component, OnInit, Input } from '@angular/core';
import { BillingService } from 'src/app/services/billing.service';


@Component({
  selector: 'app-bill-table',
  templateUrl: './bill-table.component.html',
  styleUrls: ['./bill-table.component.css']
})
export class BillTableComponent implements OnInit {

  @Input() data;
  price:number;
  fees:number;

  constructor(
    private billing:BillingService
  ) { }

  ngOnInit(): void {
    this.price = this.billing.price;
    this.fees = this.billing.fees;
  }

}
