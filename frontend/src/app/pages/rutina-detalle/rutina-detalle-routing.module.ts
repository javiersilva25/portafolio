import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RutinaDetallePage } from './rutina-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: RutinaDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RutinaDetallePageRoutingModule {}
