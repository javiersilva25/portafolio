import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.page.html',
  styleUrls: ['./exercises.page.scss'],
  standalone: false
})
export class ExercisesPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  segmentChanged(event: any) {
    const value = event.detail.value;
    this.router.navigate([`/ejercicios/${value}`]);
  }

}
