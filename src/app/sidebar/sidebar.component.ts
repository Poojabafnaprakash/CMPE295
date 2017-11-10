import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  //{ path: 'maps', title: 'Maps',  icon:'pe-7s-map-marker', class: '' },
  { path: 'home', title: 'Home', icon: 'pe-7s-graph', class: '' },
  { path: 'user', title: 'User Profile', icon: 'pe-7s-user', class: '' },
  { path: 'table', title: 'Congestion Details', icon: 'pe-7s-note2', class: '' },
  { path: 'notifications', title: 'Notifications', icon: 'pe-7s-bell', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  };

}
