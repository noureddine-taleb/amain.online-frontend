import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Bill } from '../../models/bill/bill';
import { SeoService } from '../../services/seo/seo.service';
import { empty } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  protected subs = empty().subscribe();
  bills: Bill[] 
  
  constructor(
    private userService: UserService, 
    private spinnerService: NgxSpinnerService,
    private seoService: SeoService,
    ) 
  {}

  ngOnInit(): void {
    this.seoService.setTitleDesc('profile', 'show bills of authenticated user')
    this.spinnerService.show();
    this.subs.add(this.userService.bills().subscribe(
    res => {
      this.spinnerService.hide();
      this.bills = res['bills'];
    },
    _ => this.spinnerService.hide() ))

  }

  public ngOnDestroy() {
    this.subs.unsubscribe(); 
  }
}
