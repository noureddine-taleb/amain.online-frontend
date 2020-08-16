import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Bill } from '../../models/bill/bill';
import { SeoService } from '../../services/seo/seo.service';
import { empty, Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  protected subs: Subscription[] = []
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
    const billSub = this.userService.bills().subscribe(
      res => {
        this.spinnerService.hide();
        this.bills = res.bills;
      },
      _ => this.spinnerService.hide()
    )
    this.subs.push(billSub)
  }

  public ngOnDestroy() {
    for (const s of this.subs) {
      s.unsubscribe()
    }
  }
}
