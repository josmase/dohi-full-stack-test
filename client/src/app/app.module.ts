import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BundleComponent } from './bundle/bundle.component';
import { PathComponent } from './path/path.component';
import { PlaceComponent } from './place/place.component';
import {AppRoutingModule} from "./app-routing.module";
import {DataService} from "./data.service";


@NgModule({
  declarations: [
    AppComponent,
    BundleComponent,
    PathComponent,
    PlaceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
