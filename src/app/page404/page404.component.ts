import { Component, OnInit } from '@angular/core';
import { faEnvelope, faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.css']
})
export class Page404Component implements OnInit {
  faEnvelope = faEnvelope;
  faHome = faHome;
  constructor() { }

  ngOnInit(): void {
  }

}
