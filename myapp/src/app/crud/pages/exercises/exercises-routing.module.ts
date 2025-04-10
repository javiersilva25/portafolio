import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExercisesPage } from './exercises.page';
import { AddExerciseComponent } from '../../components/add-exercise/add-exercise.component';
import { UpdateExerciseComponent } from '../../components/update-exercise/update-exercise.component';
import { DeleteExerciseComponent } from '../../components/delete-exercise/delete-exercise.component';

const routes: Routes = [
  {
    path: '',
    component: ExercisesPage,
    children:[
      {
        path: 'add-exercise',
        component: AddExerciseComponent,
      },
      {
        path: 'update-exercise',
        component: UpdateExerciseComponent
      },
      {
        path: 'delete-exercise',
        component: DeleteExerciseComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExercisesPageRoutingModule {}
