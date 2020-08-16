import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  protected subs: Subscription[] = []
  constructor(
    private _userService: UserService,
  ) { }

  ngOnInit(): void {
    const usrSub = this._userService.getUser().subscribe()
    this.subs.push(usrSub
      )
  }

  public ngOnDestroy() {
    for (const s of this.subs) {
      s.unsubscribe()
    }
  }
}
