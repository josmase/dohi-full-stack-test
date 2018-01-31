import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {BundleObject} from "./bundle-object";
import {Bundle} from "./bundle";

@Component({
  selector: 'app-bundle',
  templateUrl: './bundle.component.html',
  styleUrls: ['./bundle.component.css']
})
export class BundleComponent implements OnInit {
  bundles: Object[];

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.get();
  }

  get() {
    this.dataService.get("bundles")
      .then(data => {
        this.bundles = data.map((bundle: BundleObject) => {
          return new Bundle(bundle.id, bundle.name, bundle.info, bundle.image)
        });
      })
      .catch(err => console.log(err))
  }

  update(bundle) {
    this.dataService.put("bundle", bundle.item, bundle.id)
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  delete(bundle, index) {
    this.dataService.delete("bundle", bundle.id)
      .then(() => {
        this.bundles.splice(index, 1);
      })
      .catch(err => console.log(err))
  }

  create(bundle) {
    this.dataService.post('bundle', bundle)
      .then(() => this.get())
      .catch(err => console.log(err))
  }
}
