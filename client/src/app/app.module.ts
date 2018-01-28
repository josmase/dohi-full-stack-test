import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BundleComponent } from './bundle/bundle.component';
import { PathComponent } from './path/path.component';
import { PlaceComponent } from './place/place.component';


@NgModule({
  declarations: [
    AppComponent,
    BundleComponent,
    PathComponent,
    PlaceComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
