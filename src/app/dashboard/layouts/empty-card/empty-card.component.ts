import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-empty-card',
  templateUrl: './empty-card.component.html',
  styleUrls: ['./empty-card.component.css']
})
export class EmptyCardComponent implements OnInit {

  @Input() label: string
  constructor() { }

  ngOnInit(): void {
  }

}
