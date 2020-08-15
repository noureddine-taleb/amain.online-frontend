import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Bill } from '../../models/bill/bill';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  bills: Bill[] 
  
  constructor(
    private userService: UserService, 
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

}
