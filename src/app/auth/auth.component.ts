import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LazyLoadResourcesService } from '../services/lazy-load-resources/lazy-load-resources.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(
    private _lazyLoadResourcesService: LazyLoadResourcesService,
  ) { }

  ngOnInit(): void {
    this._lazyLoadResourcesService.loadAuthModuleResources()
  }



}
