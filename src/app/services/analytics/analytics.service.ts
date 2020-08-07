import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
declare function gtag(...args: any[]): void;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(
    @Inject(PLATFORM_ID) private platform: object, 
  ) { }

  pageView(){
    if(isPlatformServer(this.platform)) return
    gtag('event', 'page_view', {
      'page_title': document.title,
      'page_location': location.href,
      'page_path': location.pathname,
    })
    
  }

  event(category: string, action:string, label: string, value?: number) {
    if(isPlatformServer(this.platform)) return
    gtag('event', action, {
      'event_category': category,
      'event_label': label,
      'value': value,
    })
  }

  exception(err: object) {
    if(isPlatformServer(this.platform)) return
    gtag('event', 'exception', err)
  }
}
