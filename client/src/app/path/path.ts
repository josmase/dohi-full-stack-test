import {BasicItem} from "../basic-item";
import {InputBase} from "../input-base";

export class Path extends BasicItem {
  length: InputBase;
  duration: InputBase;

  constructor( id?: number, name?: string, info?: string, image?: string, length?: string, duration?: string) {
    super(id, 'path', name, info, image);
    this.length = new InputBase({key: 'length', label: 'Length', value: length, required: true, type: 'text'});
    this.duration = new InputBase({key: 'duration', label: 'Duration', value: duration, required: true, type: 'text'})
  }

  getFields(): InputBase[] {
    const fields = super.getFields();
    fields.push(this.length, this.duration);
    return fields;
  }


}
