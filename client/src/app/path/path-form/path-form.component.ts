import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-path-form',
  templateUrl: './path-form.component.html',
  styleUrls: ['./path-form.component.css']
})
export class PathFormComponent implements OnInit {
  @Input() path: object;
  @Input() isCreate: boolean;
  @Output() onSubmit: EventEmitter<object> = new EventEmitter<object>();
  @Output() onDelete: EventEmitter<object> = new EventEmitter<object>();
  private submitText: string;

  constructor() {
  }

  ngOnInit() {
    this.submitText = this.isCreate ? "Create" : "Update";
  }

  sendSubmit() {
    this.onSubmit.emit(this.path);
  }

  sendDelete() {
    this.onDelete.emit(this.path)
  }

}
