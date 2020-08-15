import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { trigger, transition, animate, style, query, animateChild, group } from '@angular/animations';
import { filter } from 'rxjs/operators';
import { AnalyticsService } from './services/analytics/analytics.service';
import { empty } from 'rxjs';
const $in = [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%'
        })
      ], {optional: true}),
      query(':enter', [
        style({ right: '-100%'})
      ], {optional: true}),
      query(':leave', animateChild(), {optional: true}),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ right: '100%'}))
        ], {optional: true}),
        query(':enter', [
          animate('300ms ease-out', style({ right: '0%'}))
        ], {optional: true})
      ]),
      query(':enter', animateChild(), {optional: true}),
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
      ], {optional: true}),
      query(':enter', [
        style({ left: '-100%'})
      ], {optional: true}),
      query(':leave', animateChild(), {optional: true}),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ left: '100%'}))
        ], {optional: true}),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%'}))
        ], {optional: true})
      ]),
      query(':enter', animateChild(), {optional: true}),
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
  protected subs = empty().subscribe();
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private analyticsService: AnalyticsService,
    )
  {}

  ngOnInit(): void {
    this.analyticsService.collectWebVitals()
    this.subs.add(this._router.events
    .pipe(filter(e => e instanceof NavigationEnd))
    .subscribe(this.analyticsService.pageView))
  }

  prepareRoute(outlet: RouterOutlet) {
    const animation = this._route?.snapshot?.firstChild?.root?.firstChild?.firstChild?.data?.['animation'] || this._route?.snapshot?.firstChild?.data?.['animation']
    return animation
  }

  public ngOnDestroy() {
    this.subs.unsubscribe(); 
  }
}
