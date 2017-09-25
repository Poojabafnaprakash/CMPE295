import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';

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

  constructor(public location: Location) { }

  ngOnInit() {
    // const myLatlng = new google.maps.LatLng(37.279518, -121.867905);
    //
    // const mapOptions = {
    //     zoom: 13,
    //     center: myLatlng,
    //     scrollwheel: false
    // };
    // const map = new google.maps.Map(document.getElementById('map'), mapOptions);
    // const Marker = new google.maps.Marker({
    //     position: myLatlng,
    //     title: 'Hello World!'
    // });
    // // To add the marker to the map, call setMap();
    // Marker.setMap(map);
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
