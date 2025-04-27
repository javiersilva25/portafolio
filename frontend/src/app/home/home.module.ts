import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { EntrenamientosComponent } from '../components/entrenamientos/entrenamientos.component';
import { NutricionComponent } from '../components/nutricion/nutricion.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, EntrenamientosComponent, NutricionComponent], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
