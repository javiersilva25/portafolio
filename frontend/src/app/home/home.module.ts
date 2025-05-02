import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { EntrenamientosComponent } from '../components/entrenamientos/entrenamientos.component';
import { NutricionComponent } from '../components/nutricion/nutricion.component';
import { AlimentoModalComponent } from '../components/nutricion/alimento-modal/alimento-modal.component';
import { PerfilComponent } from '../components/perfil/perfil.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, EntrenamientosComponent, NutricionComponent, AlimentoModalComponent, PerfilComponent], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
