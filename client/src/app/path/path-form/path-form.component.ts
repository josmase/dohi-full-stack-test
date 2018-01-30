import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-path-form',
  templateUrl: './path-form.component.html',
  styleUrls: ['./path-form.component.css']
})
export class PathFormComponent implements OnInit {
  @Input() path: object;

  constructor() {
  }

  ngOnInit() {
  }

}
