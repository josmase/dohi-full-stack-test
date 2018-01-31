export class InputBase {
  value: any;
  key: string;
  label: string;
  required: boolean;
  order: number;
  type: string;

  constructor(options: {
    value?: any,
    key?: string,
    label?: string,
    required?: boolean,
    order?: number,
    type?: string
  } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.type = options.type || 'text';
  }
}
