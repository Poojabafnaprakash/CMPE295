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
  private results: PredictedResults;

  constructor(private userInputService: UserInputService) { }

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
    this.userInput = new UserInput(1, "", "");
  }

  private save(): void {
    this.userInputService.create(this.userInput);
  }

  onSubmit(userInputForm: NgForm) {
    // console.log(this.userInput);
    // console.log(userInputForm);
    this.statusCode = null;
    this.userInputService.create(this.userInput)
    .subscribe(successCode => {
      //this.statusCode = successCode;
    //  console.log(this.statusCode);
      this.results = successCode;
      console.log(this.results);
    },
    errorCode => this.statusCode = errorCode);
    console.log(this.statusCode);
  }
}
