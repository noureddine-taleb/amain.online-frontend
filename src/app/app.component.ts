import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { trigger, transition, animate, style, query, animateChild, group } from '@angular/animations';
import { filter } from 'rxjs/operators';
import { AnalyticsService } from './services/analytics/analytics.service';
const $in = [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ right: '-100%'})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ right: '100%'}))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ right: '0%'}))
        ])
      ]),
      query(':enter', animateChild()),
]

const $out = [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%'})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ left: '100%'}))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%'}))
        ])
      ]),
      query(':enter', animateChild()),
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routeAnimations', [
      // in
      transition('loginFormPage => profilePage', $in),
      // in
      transition('userListPage => billListPage', $in),
      // out
      transition('* => loginFormPage', $out),
      // out
      transition('billListPage => userListPage', $out),
    ])
  ]

})
export class AppComponent {

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private analyticsService: AnalyticsService,
    )
  {}

  ngOnInit(): void {
    this.analyticsService.collectWebVitals()
    this._router.events
    .pipe(filter(e => e instanceof NavigationEnd))
    .subscribe(this.analyticsService.pageView)
  }

  prepareRoute(outlet: RouterOutlet) {
    const animation = this._route?.snapshot?.firstChild?.root?.firstChild?.firstChild?.data?.['animation'] || this._route?.snapshot?.firstChild?.data?.['animation']
    return animation
  }

}
