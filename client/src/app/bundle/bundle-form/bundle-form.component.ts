import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-bundle-form',
  templateUrl: './bundle-form.component.html',
  styleUrls: ['./bundle-form.component.css']
})
export class BundleFormComponent implements OnInit {
  @Input() bundle: object;
  @Output() onSubmit: EventEmitter<object> = new EventEmitter<object>();

  constructor() {
  }

  ngOnInit() {
  }

  sendSubmit() {
    this.onSubmit.emit(this.bundle);
  }


}
