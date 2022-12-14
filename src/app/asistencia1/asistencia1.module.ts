import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Asistencia1PageRoutingModule } from './asistencia1-routing.module';

import { Asistencia1Page } from './asistencia1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Asistencia1PageRoutingModule
  ],
  declarations: [Asistencia1Page]
})
export class Asistencia1PageModule {}
