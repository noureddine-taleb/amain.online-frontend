import { Component, OnInit } from '@angular/core';
import { faEnvelope, faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-page500',
  templateUrl: './page500.component.html',
  styleUrls: ['./page500.component.css']
})
export class Page500Component implements OnInit {
  faEnvelope = faEnvelope;
  faHome = faHome;
  constructor() { }

  ngOnInit(): void {
  }

}
