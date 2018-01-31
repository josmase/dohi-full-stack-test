import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';


import {AppComponent} from './app.component';
import {BundleComponent} from './bundle/bundle.component';
import {PathComponent} from './path/path.component';
import {PlaceComponent} from './place/place.component';
import {AppRoutingModule} from "./app-routing.module";
import {DataService} from "./data.service";
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatToolbarModule
} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DynamicInputComponent} from './dynamic-form/dynamic-input/dynamic-input.component';
import {DynamicFormComponent} from './dynamic-form/dynamic-form.component';
import {CreateItemDialogComponent} from './create-item-dialog/create-item-dialog.component';
import {OpenDialogService} from "./create-item-dialog/open-dialog.service";


@NgModule({
  declarations: [
    AppComponent,
    BundleComponent,
    PathComponent,
    PlaceComponent,
    DynamicInputComponent,
    DynamicFormComponent,
    CreateItemDialogComponent
  ],
  entryComponents: [
    CreateItemDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatIconModule
  ],
  providers: [DataService,OpenDialogService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
