import {BasicItem} from "../basic-item";
import {InputBase} from "../input-base";

export class Place extends BasicItem {
  radius: InputBase;

  constructor(type: string, id: number, name: string, info: string, image: string, radius: number) {
    super(id, type, name, info, image);
    this.radius = new InputBase({key: 'radius', label: 'Radius', value: radius, required: true, type: 'number'})
  }

  getFields(): InputBase[] {
    const fields = super.getFields();
    fields.push(this.radius);
    return fields;
  }


}
