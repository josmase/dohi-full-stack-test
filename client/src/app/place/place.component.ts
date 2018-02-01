import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {ActivatedRoute} from "@angular/router";
import {Place} from "./place";
import {BasicItem} from "../basic-item";
import {PlaceObject} from "./place-object";
import {OpenDialogService} from "../create-item-dialog/open-dialog.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {

  places: BasicItem[];
  private pathId: number;

  constructor(private dataService: DataService, private route: ActivatedRoute, private dialog: OpenDialogService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.pathId = parseInt(params.get('pathId'));
      this.get();
    })
  }

  get() {
    this.dataService.get("places", this.pathId)
      .then(data => {
        this.places = data.map((place: PlaceObject) => {
          return new Place(this.pathId, place.id, place.name, place.info, place.image, place.radius)
        });

      })
      .catch(err => console.log(err))
  }

  update(place) {
    this.dataService.put("place", place.item, place.id)
      .then(() => this.snackBar.open(`Updated ${place.item.name}`, null, {
        duration: 2000,
      }))
      .catch(err => console.log(err))
  }

  delete(place, index: number) {
    this.dataService.delete("place", place.id)
      .then(() => {
        this.places.splice(index, 1);
      })
      .catch(err => console.log(err))
  }

  create() {
    this.dialog.open(new Place(this.pathId)).subscribe(() => this.get());
  }
}
