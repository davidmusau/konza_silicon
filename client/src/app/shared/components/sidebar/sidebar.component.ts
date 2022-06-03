import {Component, OnInit} from '@angular/core';
import {NavigationStart, Router} from "@angular/router";
import {AuthService} from "../../../services/authservice/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
   isLoggedIn$: boolean = false;

  constructor(private router: Router ,private authService: AuthService) {
    router.events.forEach((event)=>{
      if (event instanceof NavigationStart){
        this.isLoggedIn$ = event['url'] != '/login';
      }
    });

  }

  ngOnInit(): void {
  }

}
