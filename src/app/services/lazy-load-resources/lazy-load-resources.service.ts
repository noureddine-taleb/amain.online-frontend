import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Resource<T> {
  tag: string
  attr: string
  value: string
  attr2: string
  value2: string | boolean
  parentTag: string
}

@Injectable({
  providedIn: 'root'
})
export class LazyLoadResourcesService {

  private _bootstrapJs: Resource<HTMLScriptElement> = { tag: 'script', attr: 'src', value: "bootstrap.min.js", attr2: "async", value2: true, parentTag: 'head' }
  private _jqueryJs: Resource<HTMLScriptElement> = { tag: 'script', attr: 'src', value: "jquery.min.js", attr2: "async", value2: true, parentTag: 'body' }
  private _bootstrapCss: Resource<HTMLScriptElement> = { tag: 'script', attr: 'src', value: "bootstrap.min.css.js", attr2: "async", value2: true, parentTag: 'body' }
  private _stylesCss: Resource<HTMLScriptElement> = { tag: 'script', attr: 'src', value: "styles.min.css.js", attr2: "async", value2: true, parentTag: 'head' }
  private _fontAwesomeCss: Resource<HTMLScriptElement> = { tag: 'script', attr: 'src', value: "font-awesome.min.css.js", attr2: "async", value2: true, parentTag: 'head' }
  private _gtagJs: Resource<HTMLScriptElement> = { tag: 'script', attr: 'src', value: "https://www.googletagmanager.com/gtag/js?id=UA-158875561-3", attr2: "defer", value2: true, parentTag: 'body' }

  constructor(
    @Inject(PLATFORM_ID) private platform: object 
  ) { }

  public loadAuthModuleResources(){
    if(isPlatformBrowser(this.platform)){
      !this._ResourceExists(this._gtagJs) && this._loadResource(this._gtagJs)
      !this._ResourceExists(this._bootstrapCss) && this._loadResource(this._bootstrapCss)
      !this._ResourceExists(this._stylesCss) && this._loadResource(this._stylesCss)
      !this._ResourceExists(this._fontAwesomeCss) && this._loadResource(this._fontAwesomeCss)
    }
  }

  public loadDashboardModuleResources(){
    if(isPlatformBrowser(this.platform)){
      !this._ResourceExists(this._gtagJs) && this._loadResource(this._gtagJs)
      !this._ResourceExists(this._fontAwesomeCss) && this._loadResource(this._fontAwesomeCss)
      !this._ResourceExists(this._jqueryJs) && this._loadResource(this._jqueryJs)
      !this._ResourceExists(this._bootstrapJs) && this._loadResource(this._bootstrapJs)
    }
  }

  private _loadResource<T>(res: Resource<T>): void{ 
    const element = window.document.createElement(res.tag) as unknown as T
    element[res.attr] = res.value
    element[res.attr2] = res.value2
    window.document[res.parentTag].appendChild(element)
  }
  
  private _ResourceExists<T>(res: Resource<T>): boolean{
    return !!window.document.querySelector(`${res.tag}[${res.attr}="${res.value}"]`)
  }
}
