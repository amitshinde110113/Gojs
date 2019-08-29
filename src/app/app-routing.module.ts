import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DraggableComponent } from './draggable/draggable.component';


const routes: Routes = [
  { path: '', redirectTo: 'draggable', pathMatch: 'full' },
  {
    path: 'draggable',
    component: DraggableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
