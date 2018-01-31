import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InputBase} from "../input-base";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BasicItem} from "../basic-item";

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

  @Input() item: BasicItem;
  @Input() isCreate: boolean;
  @Output() onSubmit: EventEmitter<object> = new EventEmitter<object>();
  @Output() onDelete: EventEmitter<object> = new EventEmitter<object>();
  private submitText: string;
  inputs: InputBase[];
  form: FormGroup;

  showLink: boolean;
  private url: string;
  private urlMessage: string;

  constructor() {
  }

  ngOnInit() {
    this.inputs = this.item.getFields();
    this.form = this.toFormGroup(this.inputs);
    this.submitText = this.isCreate ? "Create" : "Update";
    this.setupLink()
  }

  setupLink() {
    if (this.item.type === 'bundle' && !this.isCreate) {
      this.showLink = true;
      this.url = `/paths/${this.item.id}`;
      this.urlMessage = 'Edit paths';
    } else if (this.item.type === 'path' && !this.isCreate) {
      this.showLink = true;
      this.url = `/places/${this.item.id}`;
      this.urlMessage = 'Edit places';
    } else {
      this.showLink = false
    }
  }

  toFormGroup(inputs: InputBase[]) {
    let group: any = {};
    inputs.forEach(input => {
      group[input.key] = input.required ? new FormControl(input.value || '', Validators.required)
        : new FormControl(input.value || '');
    });
    return new FormGroup(group);
  }

  sendSubmit() {
    this.onSubmit.emit({item: this.form.value, id: this.item.id, refId: this.item.refId, type: this.item.type});
  }

  sendDelete() {
    this.onDelete.emit({id: this.item.id, type: this.item.type})
  }

}
