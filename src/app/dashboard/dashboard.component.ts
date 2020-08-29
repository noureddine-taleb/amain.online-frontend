import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Subscription } from 'rxjs';
import { LazyLoadResourcesService } from '../services/lazy-load-resources/lazy-load-resources.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  protected subs: Subscription[] = []
  constructor(
    private _userService: UserService,
    private _lazyLoadResourcesService: LazyLoadResourcesService,
  ) { }

  ngOnInit(): void {
    console.log(environment)
    this._lazyLoadResourcesService.loadDashboardModuleResources()
    const usrSub = this._userService.getUser().subscribe()
    this.subs.push(usrSub)
  }

  public ngOnDestroy() {
    for (const s of this.subs) {
      s.unsubscribe()
    }
  }
}
