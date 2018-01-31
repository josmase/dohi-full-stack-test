import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {ActivatedRoute} from "@angular/router";
import {Place} from "./place";
import {BasicItem} from "../basic-item";
import {PlaceObject} from "./place-object";

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {

  places: BasicItem[];
  private pathId: number;

  constructor(private dataService: DataService, private route: ActivatedRoute) {
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
          return new Place(place.id, place.name, place.info, place.image, place.radius)
        });

      })
      .catch(err => console.log(err))
  }

  update(place) {
    console.log(JSON.stringify(place));
    this.dataService.put("place", place.item, place.id)
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  delete(place, index: number) {
    console.log(JSON.stringify(place));
    this.dataService.delete("place", place.id)
      .then(() => {
        this.places.splice(index, 1);
      })
      .catch(err => console.log(err))
  }

  create(place) {
    this.dataService.post('place', place, this.pathId)
      .then(() => this.get())
      .catch(err => console.log(err))
  }
}
