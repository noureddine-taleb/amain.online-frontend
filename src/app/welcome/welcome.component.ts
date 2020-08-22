import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  resetHeight(e: Event){
    ( window.document.getElementsByTagName('img')[0] as HTMLImageElement).classList.remove('cover')
  }
}
