import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {BundleObject} from "./bundle-object";
import {Bundle} from "./bundle";
import {OpenDialogService} from "../create-item-dialog/open-dialog.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-bundle',
  templateUrl: './bundle.component.html',
  styleUrls: ['./bundle.component.css']
})
export class BundleComponent implements OnInit {
  bundles: Object[];

  constructor(private dataService: DataService, private dialog: OpenDialogService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.get();
  }


  create() {
    this.dialog.open(new Bundle()).subscribe(() => this.get());
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
    this.dataService.put(bundle.type, bundle.item, bundle.id)
      .then(() => this.snackBar.open(`Updated ${bundle.item.name}`, null, {
        duration: 2000,
      })).catch(err => console.log(err))
  }

  delete(bundle, index) {
    this.dataService.delete(bundle.type, bundle.id)
      .then(() => {
        this.bundles.splice(index, 1);
      })
      .catch(err => console.log(err))
  }
}
