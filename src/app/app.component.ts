import { Component } from '@angular/core';
import { RouterOutlet, ActivatedRoute, Data, Router, NavigationEnd } from '@angular/router';
import { trigger, transition, animate, style, query, state, animateChild, group } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routeAnimations', [
      transition('userListPage => billListPage', [
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

      transition('billListPage => userListPage', [
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

  constructor(private _route: ActivatedRoute, private _router: Router){

      this._router.events
      // .filter(event => event instanceof NavigationEnd)
       .subscribe(
          () => {
             console.log(this._route.snapshot.children);
          }
      );

  }

  ngOnInit(): void {
    // this.route.url.subscribe(() => {
    //   // this.animation = this.route.snapshot.data;
    //   // this.animation = this.route.snapshot.firstChild?.data;
    //   console.log('change');
    // })

    // this.route.
  }

  prepareRoute(outlet: RouterOutlet) {

    // console.log('outlet', this.route.snapshot.url)
    // return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    // return this.animation;
  }

}
