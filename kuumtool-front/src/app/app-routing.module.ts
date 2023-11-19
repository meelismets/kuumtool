import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeatmapComponent } from './heatmap/heatmap.component';
import { ClassroomComponent } from './classroom/classroom.component';

const routes: Routes = [
  { path: '', component: ClassroomComponent },
  { path: 'heatmap', component: HeatmapComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
