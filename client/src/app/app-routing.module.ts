import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BundleComponent} from "./bundle/bundle.component";
import {PlaceComponent} from "./place/place.component";
import {PathComponent} from "./path/path.component";

const routes: Routes = [
  {path: '', component: BundleComponent},
  {path: 'paths/:bundleId:', component: PathComponent},
  {path: 'places/:pathId:', component: PlaceComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
