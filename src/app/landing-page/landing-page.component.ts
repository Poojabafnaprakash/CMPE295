import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm} from '@angular/forms';
import { UserService } from './user.service';
import { User } from './model/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  user: User;
  constructor(private router: Router, private userService: UserService) {
    this.user = new User("", "");
  }

  ngOnInit() {
  }

  login(userForm: NgForm) {
    this.userService.login(this.user)
    .subscribe(successCode => {
      this.userService.setUserLoggedIn();
      //this.router.navigateByUrl('/main/dashboard');
      this.router.navigate(['main/dashboard']);
    }, errorCode => console.log("error logging in."));
  }
}
