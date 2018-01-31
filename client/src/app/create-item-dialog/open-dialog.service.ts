import {Injectable} from '@angular/core';
import {CreateItemDialogComponent} from "./create-item-dialog.component";
import {MatDialog} from "@angular/material";
import {BasicItem} from "../basic-item";

@Injectable()
export class OpenDialogService {

  constructor(private dialog: MatDialog) {
  }

  open(item: BasicItem) {
    let dialogRef = this.dialog.open(CreateItemDialogComponent, {
      width: '250px',
      data: item
    });
    return dialogRef.afterClosed()
  }
}
