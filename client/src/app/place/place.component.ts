import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {

  places: Object[];
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
        this.places = data;
      })
      .catch(err => console.log(err))
  }

  update(place) {
    this.dataService.put("place", place, place.id)
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  delete(place, index: number) {
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
