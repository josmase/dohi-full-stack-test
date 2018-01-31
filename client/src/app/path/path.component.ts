import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {ActivatedRoute} from "@angular/router";
import {Path} from "./path";
import {PathObject} from "./path-object";
import {OpenDialogService} from "../create-item-dialog/open-dialog.service";

@Component({
  selector: 'app-path',
  templateUrl: './path.component.html',
  styleUrls: ['./path.component.css']
})
export class PathComponent implements OnInit {
  paths: Object[];
  private bundleId: number;

  constructor(private dataService: DataService, private route: ActivatedRoute, private dialog: OpenDialogService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.bundleId = parseInt(params.get('bundleId'));
      this.get();
    })
  }

  get() {
    this.dataService.get("paths", this.bundleId)
      .then(data => {
        this.paths = data.map((path: PathObject) => {
          return new Path(this.bundleId, path.id, path.name, path.info, path.image, path.length, path.duration,)
        });
      })
      .catch(err => console.log(err))
  }

  update(path) {
    console.log(path);
    this.dataService.put(path.type, path.item, path.id)
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  delete(path, index) {
    this.dataService.delete("path", path.id)
      .then(() => {
        this.paths.splice(index, 1);
      })
      .catch(err => console.log(err))
  }

  create() {
    this.dialog.open(new Path(this.bundleId));
  }

}
