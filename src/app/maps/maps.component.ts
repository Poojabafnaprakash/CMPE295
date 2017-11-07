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
  predictionResult: PredictedResults;

  constructor(private userInputService: UserInputService) { }

  ngOnInit() {
    var myLatlng = new google.maps.LatLng(37.279518, -121.867905);

    var mapOptions = {
      zoom: 12,
      center: myLatlng,
      scrollwheel: false
    };
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    this.userInput = new UserInput(1, "", "", "", "");
  }

  calculateAndDisplayRoute(directionsService: any, directionsDisplay: any, pointA: any, pointB: any) {
    directionsService.route({
        origin: pointA,
        destination: pointB,
        avoidTolls: true,
        avoidHighways: false,
        travelMode: google.maps.TravelMode.DRIVING
    }, function (response, status) {
      console.log(response.routes);
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

  setFav(source: string, destination: string, dayOfWeek: string, timeOfDay: string) {
    console.log(source);
    console.log("in setFav");
    this.userInputService.setFavorite(this.userInput)
    .subscribe(successCode => {
      console.log(successCode);
    },
    errorCode => this.statusCode = errorCode);
  }

  onSubmit(userInputForm: NgForm) {
    console.log(this.userInput);
    this.statusCode = null;
    this.userInputService.create(this.userInput)
    .subscribe(successCode => {
      console.log(successCode);
      this.predictionResult = successCode;

      var pointA = new google.maps.LatLng(37.332507, -121.9124662),
             pointB = new google.maps.LatLng(37.3351874,-121.8832602);
             const myOptions = {
                 zoom: 7,
                 center: pointA
             },
             map = new google.maps.Map(document.getElementById('map'), myOptions),
             // Instantiate a directions service.
             directionsService = new google.maps.DirectionsService,
             directionsDisplay = new google.maps.DirectionsRenderer({
                 map: map
             }),
             markerA = new google.maps.Marker({
                 position: pointA,
                 title: this.userInput.source,
                 label: "S",
                 map: map
             });

         // get route from A to B
         this.calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB);



      //pollyline
      // const myLatlng = new google.maps.LatLng(37.279518, -121.867905);
      //
      // const mapOptions = {
      //   zoom: 12,
      //   center: myLatlng,
      //   scrollwheel: false
      // };
      // const map = new google.maps.Map(document.getElementById('map'), mapOptions);
      // var flightPlanCoordinates = [
      //   {lat: 37.332507, lng: -121.9124662},
      //   {lat: 37.3323574, lng: -121.9122916},
      //   {lat: 37.3421393, lng: -121.8863851},
      //   {lat: 37.337361, lng: -121.88282},
      //   {lat: 37.3373706, lng: -121.882799}
      // ];
      // var flightPath = new google.maps.Polyline({
      //   path: flightPlanCoordinates,
      //   geodesic: true,
      //   strokeColor: '#FF0000',
      //   strokeOpacity: 1.0,
      //   strokeWeight: 2
      // });
      //
      // flightPath.setMap(map);
      //
      // const AlamedaMarker = new google.maps.Marker({
      //   position: new google.maps.LatLng(37.332507, -121.9124662),
      //   title: 'Alameda'
      // });
      // const SJSUMarker = new google.maps.Marker({
      //   position: new google.maps.LatLng(37.3351874,-121.8832602),
      //   title: 'San Jose State University'
      // });
      // // To add the marker to the map, call setMap();
      // AlamedaMarker.setMap(map);
      // SJSUMarker.setMap(map);
      //end of pollyline
      console.log(this.predictionResult);
    },
    errorCode => this.statusCode = errorCode);
  }
}
