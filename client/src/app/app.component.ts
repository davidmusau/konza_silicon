import {Component, OnInit} from '@angular/core';
import {NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'E-app';
  sideBarOpen = false;
   isLoggedIn$: boolean = false;

  constructor(private router: Router) {


  }
  async ngOnInit() {
     await this.router.events.forEach((event)=>{
       if (event instanceof NavigationStart){
         this.isLoggedIn$ = event['url'] != '/login';
       }
     });
  }


  sideBarToggle() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
