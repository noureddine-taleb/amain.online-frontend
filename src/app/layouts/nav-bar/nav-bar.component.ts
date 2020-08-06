import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { isPlatformServer } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  constructor(
    public userService: UserService,
    public _router: Router,
    @Inject(PLATFORM_ID) private platform: Object, 
    ) { }

  ngOnInit(): void {
    this._router.events
    .pipe(filter(e => e instanceof NavigationEnd))
    .subscribe(this.activateNavElement.bind(this))
  }

  ngAfterViewInit(): void {
    this.activateNavElement('doesnt matter')
  }

  activateNavElement(e){
    if(isPlatformServer(this.platform)) return
    
    for(const el of document.getElementsByTagName('a')){
      el.classList.remove('active')
    }

    for(const el of document.getElementsByTagName('a')){
      if(el.pathname === this._router.url){
        el.classList.add('active')
      }
    }
  }

}
