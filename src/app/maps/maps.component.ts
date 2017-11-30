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
  latLngResponse: LatLng;
  showCongestionRateTable: boolean = false;
  sources:any;
  destinations:any;
  showProgress:boolean = false;

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

    this.sources = ["Casa Verde Street ", "Alum Rock Park", "San Jose State University", "Avaya Stadium", "DMV San Jose", "MapR Technologies, 350 Holger Way", "Winchester Mystery House", "N 1st Street ", "Santana Row", "Costco Wholesale, 1709 Automation Pkwy, San Jose, CA 95131", "Downtown San Jose", "1302,The Alameda", "Mineta San Jose International Airport"];
    this.destinations = [""];
  }

  modelChanged(newObj: any) {
    if(newObj == "Casa Verde Street") {
      this.destinations = ["Mineta San Jose International Airport", "San Jose State University", "Costco Wholesale, 1709 Automation Pkwy, San Jose, CA 95131"];
    } else if(newObj == "Alum Rock Park") {
      this.destinations = ["San Jose State University"];
    } else if(newObj == "San Jose State University") {
      this.destinations = ["1302,The Alameda", "Alum Rock Park", "Casa Verde Street ", "Mineta San Jose International Airport", "Costco Wholesale, 1709 Automation Pkwy, San Jose, CA 95131", "Avaya Stadium", "DMV San Jose", "MapR Technologies, 350 Holger Way", "Winchester Mystery House", "Santana Row"];
    } else if(newObj == "Mineta San Jose International Airport") {
      this.destinations = ["1302,The Alameda", "Casa Verde Street ", "San Jose State University"];
    } else if(newObj == "Costco Wholesale, 1709 Automation Pkwy, San Jose, CA 95131") {
      this.destinations = ["San Jose State University"];
    } else if(newObj == "Avaya Stadium") {
      this.destinations = ["San Jose State University"];
    } else if(newObj == "DMV San Jose") {
      this.destinations = ["San Jose State University"];
    } else if(newObj == "MapR Technologies, 350 Holger Way") {
      this.destinations = ["San Jose State University"];
    } else if(newObj == "Winchester Mystery House") {
      this.destinations = ["San Jose State University"];
    } else if(newObj == "N 1st Street") {
      this.destinations = ["Santana Row", "Downtown San Jose"];
    } else if(newObj == "Santana Row") {
      this.destinations = ["N 1st Street ", "San Jose State University"];
    } else if(newObj == "Costco Wholesale, 1709 Automation Pkwy, San Jose, CA 95131") {
      this.destinations = ["Casa Verde Street "];
    } else if(newObj == "Downtown San Jose") {
      this.destinations = ["N 1st Street "];
    } else if(newObj == "1302,The Alameda") {
      this.destinations = ["Mineta San Jose International Airport", "San Jose State University"];
    } else {
      this.destinations = ["Choose a proper source"];
    }
  }

  calculateAndDisplayRoute(directionsService: any, directionsDisplay: any, pointA: any, pointB: any) {
    directionsService.route({
      origin: pointA,
      destination: pointB,
      avoidTolls: true,
      avoidHighways: false,
      travelMode: google.maps.TravelMode.DRIVING
    }, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  setFav(source: string, destination: string, dayOfWeek: string, timeOfDay: string) {
    console.log(this.userInput);
    this.userInputService.setFavorite(this.userInput)
      .subscribe(successCode => {
        window.alert('Added Favorite' + successCode);
      },
      errorCode => this.statusCode = errorCode);
  }

  onSubmit(userInputForm: NgForm) {
    console.log(this.userInput);
    this.showProgress = true;
    this.statusCode = null;
    //getLatLng
    this.userInputService.getLatLng(this.userInput)
      .subscribe(successCode => {
        this.latLngResponse = successCode;
      },
      errorCode => this.statusCode = errorCode);

    //get predictionResult
    this.userInputService.create(this.userInput)
      .subscribe(successCode => {
        this.showProgress = false;
        this.predictionResult = successCode;
        this.showCongestionRateTable = true;
          var pointA = new google.maps.LatLng(this.latLngResponse.srcLat, this.latLngResponse.srcLng),
          pointB = new google.maps.LatLng(this.latLngResponse.dstLat, this.latLngResponse.dstLng);
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

        // get route from A to B
        this.calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB);

        // plot infowindow for all routes CongestionRate
        // for (var i = 0; i < this.latLngResponse.latLngSteps.length; i++) {
        //   console.log(this.latLngResponse.latLngSteps[i]);
        //   var infowindow = new google.maps.InfoWindow({
        //     content: this.predictionResult[i].StreetName + ' : ' + this.predictionResult[i].CongestionRate,
        //     map: map,
        //     position: new google.maps.LatLng(this.latLngResponse.latLngSteps[i].lat, this.latLngResponse.latLngSteps[i].lng)
        //   });
        // }

          for (var i = 1; i < this.latLngResponse.latLngSteps.length; i++) {
            var pathMarker = new google.maps.Marker({
              position: new google.maps.LatLng(this.latLngResponse.latLngSteps[i].lat, this.latLngResponse.latLngSteps[i].lng),
              map: map,
              opacity: 0.6,
              icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            });

            var infowindow = new google.maps.InfoWindow({
              content: this.latLngResponse.latLngSteps[i].html_instructions
            });


            (function(infowindow) {
              google.maps.event.addListener(pathMarker, 'mouseover', function() {
                infowindow.open(map, this);
              });

              google.maps.event.addListener(pathMarker, 'mouseout', function() {
                infowindow.close();
              });
            })(infowindow);

          }

        var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);
      },
      errorCode => this.statusCode = errorCode);
  }
}
