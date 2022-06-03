import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../../services/authservice/auth.service";
import {NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  userName: string ='';
  private dataSource: any;
  constructor(private authService: AuthService) {

  }
    ngOnInit() {
      this.authService.userInfo.subscribe(res => {
      if (res) {
          this.userName =  res.username;
      }
    });
  }

  onlogout() {
    this.authService.logout();
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent;
      new Event("resize");

    }, 300);
  }


  applyFilter() {
    const filterValue = (event?.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

  }
}
