import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarListComponentComponent } from './Component/car-list-component/car-list-component.component';
import { CarAddComponent } from './Component/car-add/car-add.component';

const routes: Routes = [
  { path: 'car-list', component: CarListComponentComponent },
  { path: 'car-add', component: CarAddComponent },
  { path: '', redirectTo: '/car-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
