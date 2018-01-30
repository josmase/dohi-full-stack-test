import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-place-form',
  templateUrl: './place-form.component.html',
  styleUrls: ['./place-form.component.css']
})
export class PlaceFormComponent implements OnInit {
  @Input() place: object;
  @Output() onSubmit: EventEmitter<object> = new EventEmitter<object>();

  constructor() {
  }

  ngOnInit() {
  }

  sendSubmit() {
    this.onSubmit.emit(this.place);
  }
}
