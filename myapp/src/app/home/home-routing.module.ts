import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { ProfileComponent } from '../components/profile/profile.component';
import { TrainingComponent } from '../components/training/training.component';
import { MacrosComponent } from '../components/macros/macros.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'training',
        component: TrainingComponent
      },
      {
        path: 'macros',
        component: MacrosComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
