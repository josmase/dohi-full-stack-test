import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {

  places: Object[];

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.get();
  }

  get() {
    this.dataService.get("places")
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

  delete(id: Number) {
    this.dataService.delete("place", id)
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  create(place) {
    this.dataService.post('place', place)
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

}
