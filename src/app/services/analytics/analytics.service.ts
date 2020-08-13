import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(
    @Inject(PLATFORM_ID) private platform: object, 
  ) { }

  pageView(): void{
    if(isPlatformBrowser(this.platform)) {
      (window as any).gtag('event', 'page_view', {
        'page_title': window.document.title,
        'page_location': window.location.href,
        'page_path': window.location.pathname,
      })
    }
  }

  event(category: string, action:string, label: string, value?: number): void {
    if(isPlatformBrowser(this.platform)){      
      (window as any).gtag('event', action, {
        'event_category': category,
        'event_label': label,
        'value': value,
      })
    }
  }

  exception(err: object): void {
    if(isPlatformBrowser(this.platform)){
      (window as any).gtag('event', 'exception', err)
    }
  }
}
