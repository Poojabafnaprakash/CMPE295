import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { UserService } from '../landing-page/user.service'

declare const google: any;
interface Marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public location: Location, private userService: UserService) { }

  ngOnInit() {
  }

  isMap(path){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice( 1 );
    if(path == titlee){
      return false;
    }
    else {
      return true;
    }
  }

}
