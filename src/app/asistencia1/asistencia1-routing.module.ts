import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Asistencia1Page } from './asistencia1.page';

const routes: Routes = [
  {
    path: '',
    component: Asistencia1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Asistencia1PageRoutingModule {}
