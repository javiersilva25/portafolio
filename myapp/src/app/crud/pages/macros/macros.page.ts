import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-macros',
  templateUrl: './macros.page.html',
  styleUrls: ['./macros.page.scss'],
  standalone: false
})
export class MacrosPage {
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigate(['macros/addFood']);
  }

  async segmentChanged($event: any) {
    console.log($event.detail.value);
    let direction = $event.detail.value;
    
    this.router.navigate(['macros/' + direction]);
  }
}
