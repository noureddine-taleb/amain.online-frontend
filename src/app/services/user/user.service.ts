import { Injectable, Injector, Inject, PLATFORM_ID } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'
import { User } from '../../core/models/user/user'
import { Observable } from 'rxjs'
import { CRUD } from '../../core/models/crud/crud'
import { isPlatformBrowser } from '@angular/common'
import { AnalyticsService } from '../analytics/analytics.service'

@Injectable({
  providedIn: 'root'
})
export class UserService implements CRUD {

  private _user: User
 _url = '/users'

  constructor(
    @Inject(PLATFORM_ID) private platform: object,
    private http: HttpClient,
    private injector: Injector,
    private analyticsService: AnalyticsService,
    ){}

  get user(){
    return this._user
  }

  getUser() {
    return this.http.get(`${this._url}/self`).pipe( map(this.store.bind(this)) )
  }

  login(data: any){
    return this.http.post(`${this._url}/session`, data).pipe( map(this.store.bind(this)) )
  }

  create(data: User){
    return this.http.post(this._url, data)
  }

  isAuth(): boolean{
    return !!this.getAuthorizationToken()
  }

  isAdmin(): boolean{
    return this._user?._isAdmin
  }

  getUserID(): string{
    return this._user?._id
  }

  logout(): void {
    if (isPlatformBrowser(this.platform)){
      this.analyticsService.event('engagement', 'log_out', 'method')
      window.localStorage.removeItem('token')
      this.injector.get(Router).navigate(['auth'])
    }
  }

  getAuthorizationToken(): string | null{
    if (isPlatformBrowser(this.platform)){
      return window.localStorage.getItem('token')
    }
    return null
  }

  upload(data: File, fileName: string){
    const formData = new FormData()
    formData.append('image', data, fileName)
    return this.http.post(`${this._url}/image`, formData, { reportProgress: true , observe: 'events'})
  }

  public getAll(query?: any){
    const queryParams = new URLSearchParams(query)
    return this.http.get(`${this._url}${queryParams.toString() && '?'}${queryParams}`)
  }

  public getImage(url: string){
    return this.http.get(url, { responseType: 'blob'})
  }

  store(res: Observable<any>): void{
    if (isPlatformBrowser(this.platform)){
      this._user = res['user']
      window.localStorage.setItem('token',  this._user?.token )
    }
  }

  bills(id?: string, query?: any): Observable<any> {
    const queryParams = new URLSearchParams(query)
    return this.http.get((id ? `${this._url}/${id}/bills${queryParams.toString() && '?'}${queryParams}` : `${this._url}/bills`))
  }
}
