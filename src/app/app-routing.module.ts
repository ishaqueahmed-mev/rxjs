import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CombinationsComponent } from './combinations/combinations.component';


const routes: Routes = [{
  path: '', component: CombinationsComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
