import { Component } from '@angular/core';
import { RouterOutlet, ActivatedRoute, Data, Router, NavigationEnd } from '@angular/router';
import { trigger, transition, animate, style, query, state, animateChild, group } from '@angular/animations';
import { filter } from 'rxjs/operators';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routeAnimations', [
      transition('pp => pp', [
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
      ]),

      transition('pp => pp', [
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
      ]),

    ])
  ]

})
export class AppComponent {
  // animation: string

  constructor(
    private _route: ActivatedRoute, 
    private _router: Router,
    private _userService: UserService,
    )
  {}

  ngOnInit(): void {
  }

  prepareRoute(outlet: RouterOutlet) {
    // return this.animation;
    // console.log(this._router.url)
    return this._router.url
  }

}
