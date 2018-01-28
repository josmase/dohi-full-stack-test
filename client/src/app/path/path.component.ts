import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-path',
  templateUrl: './path.component.html',
  styleUrls: ['./path.component.css']
})
export class PathComponent implements OnInit {
  paths: Object[];

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.get();
  }

  get() {
    this.dataService.get("paths")
      .then(data => {
        this.paths = data;
      })
      .catch(err => console.log(err))
  }

  update(path) {
    this.dataService.put("path", path, path.id)
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  delete(id: Number) {
    this.dataService.delete("path", id)
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  create(path) {
    this.dataService.post('path', path)
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

}
