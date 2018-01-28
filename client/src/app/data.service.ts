import {Injectable} from '@angular/core';

@Injectable()
export class DataService {
  apiEndpoint: String;

  constructor() {
    this.apiEndpoint = "http://localhost:3000/"
  }



}
