import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';


import {AppComponent} from './app.component';
import {BundleComponent} from './bundle/bundle.component';
import {PathComponent} from './path/path.component';
import {PlaceComponent} from './place/place.component';
import {AppRoutingModule} from "./app-routing.module";
import {DataService} from "./data.service";
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    BundleComponent,
    PathComponent,
    PlaceComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
