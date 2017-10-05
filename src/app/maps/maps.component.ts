import { Component, OnInit } from '@angular/core';
import { UserInput }    from './model/userInput';
import { NgForm} from '@angular/forms';
import { UserInputService } from './user-input.service';
import { PredictedResults } from './model/predicted-Results';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

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

  //https://loiane.com/2017/08/angular-hide-navbar-login-page/
  userInput: UserInput;
  statusCode: number;
  results: PredictedResults;

  constructor(private userInputService: UserInputService) { }

  ngOnInit() {
    const myLatlng = new google.maps.LatLng(37.279518, -121.867905);

    const mapOptions = {
      zoom: 12,
      center: myLatlng,
      scrollwheel: false
    };
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);

    const AlamedaMarker = new google.maps.Marker({
      position: new google.maps.LatLng(37.332507, -121.9124662),
      title: 'Alameda'
    });
    const SJSUMarker = new google.maps.Marker({
      position: new google.maps.LatLng(37.3351874,-121.8832602),
      title: 'San Jose State University'
    });
    // To add the marker to the map, call setMap();
    AlamedaMarker.setMap(map);
    SJSUMarker.setMap(map);

    //pollyline
    var flightPlanCoordinates = [
      {lat: 37.332507, lng: -121.9124662},
      {lat: 37.3323574, lng: -121.9122916},
      {lat: 37.3421393, lng: -121.8863851},
      {lat: 37.337361, lng: -121.88282},
      {lat: 37.3373706, lng: -121.882799}
    ];
    var flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    flightPath.setMap(map);
    this.userInput = new UserInput(1, "", "", "", "");
  }

  onSubmit(userInputForm: NgForm) {
    this.statusCode = null;
    this.userInputService.create(this.userInput)
    .subscribe(successCode => {
      console.log(successCode);
      this.results = successCode;
      console.log(this.results);
    },
    errorCode => this.statusCode = errorCode);
  }
}
