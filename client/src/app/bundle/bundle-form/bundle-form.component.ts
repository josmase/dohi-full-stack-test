import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-bundle-form',
  templateUrl: './bundle-form.component.html',
  styleUrls: ['./bundle-form.component.css']
})
export class BundleFormComponent implements OnInit {
  @Input() bundle: object;
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
    this.onSubmit.emit(this.bundle);
  }

  sendDelete() {
    this.onDelete.emit(this.bundle)
  }


}
