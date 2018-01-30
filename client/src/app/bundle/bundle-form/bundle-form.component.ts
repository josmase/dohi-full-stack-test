import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-bundle-form',
  templateUrl: './bundle-form.component.html',
  styleUrls: ['./bundle-form.component.css']
})
export class BundleFormComponent implements OnInit {
  @Input() bundle: object;

  constructor() {
  }

  ngOnInit() {
  }

}
