import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";

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
        this.bundles = data;
      })
      .catch(err => console.log(err))
  }

  update(bundle) {
    this.dataService.put("bundle", bundle, bundle.id)
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  delete(id: Number) {
    this.dataService.delete("bundle", id)
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  create(bundle) {
    this.dataService.post('bundle', bundle)
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }
}
