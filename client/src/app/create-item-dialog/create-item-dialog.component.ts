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
    this.dataService.post('bundle', data.item)
      .then((data) => console.log(data))
      .catch(err => console.log(err))
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
