import {BasicItem} from "../basic-item";
import {InputBase} from "../input-base";

export class Bundle extends BasicItem {

  constructor(type: string, id: number, name: string, info: string, image: string) {
    super(id, type, name, info, image);
  }

  getFields(): InputBase[] {
    return super.getFields();
  }
}
