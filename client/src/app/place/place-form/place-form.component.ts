import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-place-form',
  templateUrl: './place-form.component.html',
  styleUrls: ['./place-form.component.css']
})
export class PlaceFormComponent implements OnInit {
  @Input() place: object;
  constructor() { }

  ngOnInit() {
  }

}
