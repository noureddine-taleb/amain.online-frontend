import { Component, OnInit } from '@angular/core';
import { BillService } from 'src/app/services/bill.service';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit {

  bills: any[] = [];

  constructor(private billService: BillService) { }

  ngOnInit(): void {
    this.billService.index().subscribe(res => {
      this.bills = res['data'];
    });
  }

}
