import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  //constructor(public location: Location) { }
  constructor(private router: Router) {}

  ngOnInit() {
  }

  login() {
    this.router.navigateByUrl('/dashboard');
  }
}
