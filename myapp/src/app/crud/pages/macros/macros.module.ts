import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MacrosPageRoutingModule } from './macros-routing.module';

import { MacrosPage } from './macros.page';
import { AddFoodComponent } from '../../components/add-food/add-food.component';
import { UpdateFoodComponent } from '../../components/update-food/update-food.component';
import { DeleteFoodComponent } from '../../components/delete-food/delete-food.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MacrosPageRoutingModule
  ],
  declarations: [
    MacrosPage,
    AddFoodComponent,
    UpdateFoodComponent,
    DeleteFoodComponent

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MacrosPageModule {}
