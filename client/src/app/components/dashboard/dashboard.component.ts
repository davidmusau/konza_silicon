import {Component, OnInit} from '@angular/core';
import {Event as NavigationEvent, NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  event$

  constructor(private router: Router) {
    this.event$ = this.router.events.subscribe(
      (event: NavigationEvent) => {
        if (event instanceof NavigationStart) {
        //  console.log(event.url);
        }
      }
    )
  }

  ngOnDestroy() {
    this.event$.unsubscribe();
  }


  ngOnInit() {
  }


}
