import {InputBase} from "./input-base";

export class BasicItem {
  id: number;
  name: InputBase;
  info: InputBase;
  image: InputBase;

  constructor(id: number, name: string, info: string, image: string) {
    this.id = id;
    this.name = new InputBase({key: 'name', label: 'Name', value: name, required: true, type: 'text'});
    this.info = new InputBase({key: 'info', label: 'Info', value: info, required: true, type: 'text'});
    this.image = new InputBase({key: 'image', label: 'Image', value: image, required: true, type: 'text'});
  }

  getFields(): InputBase[] {
    return [this.name, this.info, this.image,];
  }
}
