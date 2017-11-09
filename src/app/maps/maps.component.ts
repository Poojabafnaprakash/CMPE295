import { Component, OnInit } from '@angular/core';
import { UserInput } from './model/userInput';
import { NgForm } from '@angular/forms';
import { UserInputService } from './user-input.service';
import { PredictedResults } from './model/predicted-Results';
import { LatLng } from "./model/latLng";
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
  latlngResponse: LatLng;

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
    }, function(response, status) {
      console.log(response.routes);
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  setFav(source: string, destination: string, dayOfWeek: string, timeOfDay: string) {
    this.userInputService.setFavorite(this.userInput)
      .subscribe(successCode => {
        window.alert('Added Favorite' + successCode);
      },
      errorCode => this.statusCode = errorCode);
  }

  onSubmit(userInputForm: NgForm) {
    console.log(this.userInput);
    this.statusCode = null;
    //getLatLng
    this.userInputService.getLatLng(this.userInput)
      .subscribe(successCode => {
        this.latlngResponse = successCode;
        // var pointA = new google.maps.LatLng(successCode.srcLat, successCode.srcLng),
        //   pointB = new google.maps.LatLng(successCode.dstLat, successCode.dstLng);
        // const myOptions = {
        //   zoom: 7,
        //   center: pointA
        // },
        //   map = new google.maps.Map(document.getElementById('map'), myOptions),
        //   // Instantiate a directions service.
        //   directionsService = new google.maps.DirectionsService,
        //   directionsDisplay = new google.maps.DirectionsRenderer({
        //     map: map
        //   }),
        //   markerA = new google.maps.Marker({
        //     position: pointA,
        //     title: this.userInput.source,
        //     label: "S",
        //     map: map
        //   }),
        //   markerB = new google.maps.Marker({
        //     position: pointB,
        //     title: this.userInput.destination,
        //     label: "D",
        //     map: map
        //   });
        // console.log(pointA);
        // // get route from A to B
        // this.calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB);
        // for (var i = 0; i < successCode.latLngSteps.length; i++) {
        //   console.log(successCode.latLngSteps[i]);
        //   var infowindow = new google.maps.InfoWindow({
        //     content: 'Hello World!',
        //     map: map,
        //     position: new google.maps.LatLng(successCode.latLngSteps[i].lat, successCode.latLngSteps[i].lng)
        //   });
        // }

      },
      errorCode => this.statusCode = errorCode);

    //get predictionResult
    this.userInputService.create(this.userInput)
      .subscribe(successCode => {
        this.predictionResult = successCode;
        var pointA = new google.maps.LatLng(this.latlngResponse.srcLat, this.latlngResponse.srcLng),
          pointB = new google.maps.LatLng(this.latlngResponse.dstLat, this.latlngResponse.dstLng);
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
          }),
          markerB = new google.maps.Marker({
            position: pointB,
            title: this.userInput.destination,
            label: "D",
            map: map
          });
        console.log(pointA);
        // get route from A to B
        this.calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB);

        //plot infowindow for all routes CongestionRate 
        for (var i = 0; i < this.latlngResponse.latLngSteps.length; i++) {
          console.log(this.latlngResponse.latLngSteps[i]);
          var infowindow = new google.maps.InfoWindow({
            content: this.predictionResult[i].StreetName + ' : ' + this.predictionResult[i].CongestionRate,
            map: map,
            position: new google.maps.LatLng(this.latlngResponse.latLngSteps[i].lat, this.latlngResponse.latLngSteps[i].lng)
          });
        }
      },
      errorCode => this.statusCode = errorCode);
  }
}
