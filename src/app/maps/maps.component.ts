import { Component, OnInit } from '@angular/core';
declare const google: any;
interface Marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
}
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      const myLatlng = new google.maps.LatLng(37.279518, -121.867905);

      const mapOptions = {
          zoom: 13,
          center: myLatlng,
          scrollwheel: false
      };
      const map = new google.maps.Map(document.getElementById('map'), mapOptions);
      const Marker = new google.maps.Marker({
          position: myLatlng,
          title: 'Hello World!'
      });
      // To add the marker to the map, call setMap();
      Marker.setMap(map);
  }

}
