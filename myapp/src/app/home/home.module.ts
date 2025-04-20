import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { AddExerciseComponent } from '../crud/components/add-exercise/add-exercise.component';
import { UpdateExerciseComponent } from '../crud/components/update-exercise/update-exercise.component';
import { DeleteExerciseComponent } from '../crud/components/delete-exercise/delete-exercise.component';
import { MacrosComponent } from '../components/macros/macros.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { TrainingComponent } from '../components/training/training.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    AddExerciseComponent,
    UpdateExerciseComponent,
    DeleteExerciseComponent,
    MacrosComponent,
    ProfileComponent,
    TrainingComponent

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
