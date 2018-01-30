import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-place-form',
  templateUrl: './place-form.component.html',
  styleUrls: ['./place-form.component.css']
})
export class PlaceFormComponent implements OnInit {
  @Input() place: object;
  @Input() isCreate: boolean;
  @Output() onSubmit: EventEmitter<object> = new EventEmitter<object>();
  private submitText: string;

  constructor() {
  }

  ngOnInit() {
    this.submitText = this.isCreate ? "Create" : "Update";
  }

  sendSubmit() {
    this.onSubmit.emit(this.place);
  }
}
