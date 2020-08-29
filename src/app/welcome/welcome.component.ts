import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(
    @Inject(PLATFORM_ID) private platform: object 
  ) { }

  ngOnInit(): void {
  }

  resetHeight(e: Event){
    if(isPlatformBrowser(this.platform)){
      const container = window.document.querySelector("._container")
      const overlay = window.document.querySelector("template")
      container.appendChild(overlay.firstElementChild)
    }
  }
}
