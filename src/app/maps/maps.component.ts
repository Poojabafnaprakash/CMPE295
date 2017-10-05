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
      zoom: 11,
      center: myLatlng,
      scrollwheel: false
    };
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
    const Marker = new google.maps.Marker({
      position: myLatlng,
      title: 'Hello World!'
    });
    const SJSUMarker = new google.maps.Marker({
      position: new google.maps.LatLng(37.3351874,-121.8832602),
      title: 'San Jose State University'
    });
    // To add the marker to the map, call setMap();
    Marker.setMap(map);
    SJSUMarker.setMap(map);
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
