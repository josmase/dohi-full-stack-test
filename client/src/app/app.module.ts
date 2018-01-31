import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';


import {AppComponent} from './app.component';
import {BundleComponent} from './bundle/bundle.component';
import {PathComponent} from './path/path.component';
import {PlaceComponent} from './place/place.component';
import {AppRoutingModule} from "./app-routing.module";
import {DataService} from "./data.service";
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatToolbarModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PathFormComponent} from './path/path-form/path-form.component';
import {BundleFormComponent} from './bundle/bundle-form/bundle-form.component';
import {DynamicInputComponent} from './dynamic-form/dynamic-input/dynamic-input.component';
import {DynamicFormComponent} from './dynamic-form/dynamic-form.component';


@NgModule({
  declarations: [
    AppComponent,
    BundleComponent,
    PathComponent,
    PlaceComponent,
    PathFormComponent,
    BundleFormComponent,
    DynamicInputComponent,
    DynamicFormComponent
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
    MatToolbarModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
