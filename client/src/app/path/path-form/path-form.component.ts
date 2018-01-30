import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-path-form',
  templateUrl: './path-form.component.html',
  styleUrls: ['./path-form.component.css']
})
export class PathFormComponent implements OnInit {
  @Input() path: object;
  @Output() onSubmit: EventEmitter<object> = new EventEmitter<object>();

  constructor() {
  }

  ngOnInit() {
  }

  sendSubmit() {
    this.onSubmit.emit(this.path);
  }

}
