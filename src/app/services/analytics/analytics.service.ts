import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { getCLS, getFID, getLCP } from 'web-vitals';

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

  __sendToGoogleAnalytics({name, delta, id}: {name: string, delta: number, id: string}): void{
    if(isPlatformBrowser(this.platform)){
      // Assumes the global `gtag()` function exists, see:
      // https://developers.google.com/analytics/devguides/collection/gtagjs
      (window as any).gtag('event', name, {
        event_category: 'Web Vitals',
        // Google Analytics metrics must be integers, so the value is rounded.
        // For CLS the value is first multiplied by 1000 for greater precision
        // (note: increase the multiplier for greater precision if needed).
        value: Math.round(name === 'CLS' ? delta * 1000 : delta),
        // The `id` value will be unique to the current page load. When sending
        // multiple values from the same page (e.g. for CLS), Google Analytics can
        // compute a total by grouping on this ID (note: requires `eventLabel` to
        // be a dimension in your report).
        event_label: id,
        // Use a non-interaction event to avoid affecting bounce rate.
        non_interaction: true,
      });
    }
  }

  collectWebVitals(): void{
    getCLS(this.__sendToGoogleAnalytics.bind(this))
    getFID(this.__sendToGoogleAnalytics.bind(this))
    getLCP(this.__sendToGoogleAnalytics.bind(this))
  }
}
