import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(
    @Inject(PLATFORM_ID) private platform: object, 
  ) { }

  pageView(){
    if(isPlatformBrowser(this.platform)) {
      (window as any).gtag('event', 'page_view', {
        'page_title': document.title,
        'page_location': location.href,
        'page_path': location.pathname,
      })
    }
    
  }

  event(category: string, action:string, label: string, value?: number) {
    if(isPlatformBrowser(this.platform)){      
      (window as any).gtag('event', action, {
        'event_category': category,
        'event_label': label,
        'value': value,
      })
    }
  }

  exception(err: object) {
    if(isPlatformBrowser(this.platform)){
      (window as any).gtag('event', 'exception', err)
    }
  }
}
