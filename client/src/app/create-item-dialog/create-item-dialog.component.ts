import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {BasicItem} from "../basic-item";
import {DataService} from "../data.service";

@Component({
  selector: 'app-create-item-dialog',
  templateUrl: './create-item-dialog.component.html',
  styleUrls: ['./create-item-dialog.component.css']
})
export class CreateItemDialogComponent {

  constructor(public dialogRef: MatDialogRef<CreateItemDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: BasicItem, private dataService: DataService) {
  }

  create(data) {
    console.log(data);
    this.dataService.post(data.type, data.item, data.refId)
      .then(() => this.dialogRef.close())
      .catch(err => console.log(err))
  }

}
