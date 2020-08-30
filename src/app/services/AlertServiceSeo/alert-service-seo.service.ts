import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { AlertService } from 'ngx-alerts';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoAlertService {

  constructor(
    @Inject(PLATFORM_ID) private platform,
    private alertService: AlertService,
  ) { }

  success(selector: string){
    return this.alertService.success(isPlatformBrowser(this.platform) ? window.document.querySelector(selector).textContent : '')
  }

  danger(selector: string){
    return this.alertService.danger(isPlatformBrowser(this.platform) ? window.document.querySelector(selector).textContent : '')
  }
}
