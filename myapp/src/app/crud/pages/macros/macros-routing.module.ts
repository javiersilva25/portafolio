import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MacrosPage } from './macros.page';
import { AddFoodComponent } from '../../components/add-food/add-food.component';
import { UpdateFoodComponent } from '../../components/update-food/update-food.component';
import { DeleteFoodComponent } from '../../components/delete-food/delete-food.component';

const routes: Routes = [
  {
    path: '',
    component: MacrosPage,
    children: [
      {
        path: 'addFood',
        component: AddFoodComponent
      },
      {
        path: 'updateFood',
        component: UpdateFoodComponent
      },
      {
        path: 'deleteFood',
        component: DeleteFoodComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MacrosPageRoutingModule {}
