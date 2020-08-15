import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { empty } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  protected subs = empty().subscribe();
  constructor(
    private _userService: UserService,
  ) { }

  ngOnInit(): void {
    this.subs.add(this._userService.getUser().subscribe())
  }

  public ngOnDestroy() {
    this.subs.unsubscribe(); 
  }
}
